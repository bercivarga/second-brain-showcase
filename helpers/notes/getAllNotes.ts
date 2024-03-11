import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

const PAGE_SIZE = 24;

type GetAllNotesOptions = {
  page?: number;
  paginate?: boolean;
  results?: "all" | "deleted" | "active";
};

export async function getAllNotes({
  page,
  paginate = false,
  results = "active",
}: GetAllNotesOptions = {}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return null;
    }

    let deletedOption = undefined;

    switch (results) {
      case "all":
        break;
      case "deleted":
        deletedOption = true;
        break;
      case "active":
        deletedOption = false;
        break;
    }

    const transaction = await prisma.$transaction([
      prisma.note.count({
        where: { authorId: dbUser.id, deleted: deletedOption },
      }),
      prisma.note.findMany({
        where: { authorId: dbUser.id, deleted: deletedOption },
        include: { tags: true, relatedNotes: true, relatedTo: true },
        orderBy: { updatedAt: "desc" },
        take: paginate ? PAGE_SIZE : undefined,
        skip: paginate && page ? (page - 1) * PAGE_SIZE : undefined,
      }),
    ]);

    const [count, notes] = transaction;

    return {
      count,
      totalPages: paginate ? Math.ceil(count / PAGE_SIZE) : 1,
      notes,
    };
  } catch (error) {
    return null;
  } finally {
    revalidatePath("/notes");
  }
}
