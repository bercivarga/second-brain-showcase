"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export async function restoreNote(noteId: string) {
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

    const note = await prisma.note.update({
      where: { id: noteId, authorId: dbUser.id },
      data: { deleted: false },
    });

    return note;
  } catch (error) {
    return null;
  } finally {
    revalidatePath("/notes");
    revalidatePath("/notes/trash");
    revalidatePath(`/notes/${noteId}`, "page");
  }
}
