import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

const PAGE_SIZE = 12;

export async function getAllNotes({
  page,
  paginate = false,
}: {
  page?: number;
  paginate?: boolean;
} = {}) {
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

    const transaction = await prisma.$transaction([
      prisma.note.count({
        where: { authorId: dbUser.id, deleted: false },
      }),
      prisma.note.findMany({
        where: { authorId: dbUser.id, deleted: false },
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
