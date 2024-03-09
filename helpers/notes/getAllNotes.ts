"use server";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

export async function getAllNotes() {
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

    const notes = await prisma.note.findMany({
      where: { authorId: dbUser.id, deleted: false },
      include: { tags: true },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    return notes;
  } catch (error) {
    return null;
  }
}
