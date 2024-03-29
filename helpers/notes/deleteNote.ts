"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export async function deleteNote(noteId: string) {
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
      data: { deleted: true },
    });

    // Need to disconnect relations after note is deleted
    const notesWithThisNoteAsRelated = await prisma.note.findMany({
      where: {
        OR: [
          { relatedNotes: { some: { id: noteId } } },
          { relatedTo: { some: { id: noteId } } },
        ],
      },
    });

    for (const note of notesWithThisNoteAsRelated) {
      await prisma.note.update({
        where: { id: note.id },
        data: {
          relatedNotes: {
            disconnect: { id: noteId },
          },
        },
      });
    }

    return note;
  } catch (error) {
    return null;
  } finally {
    revalidatePath("/notes");
    revalidatePath("/notes/trash");
    revalidatePath(`/notes/${noteId}`, "page");
  }
}
