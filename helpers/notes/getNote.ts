"use server";

import { auth } from "@clerk/nextjs";

import { prisma } from "@/lib/db";

export async function getNote(noteId: string) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return null;
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId, authorId: dbUser.id },
    });

    return note;
  } catch (error) {
    return null;
  }
}
