"use server";

import { prisma } from "@/lib/db";

export async function removeTag(noteId: string, tagId: string) {
  try {
    return await prisma.note.update({
      where: { id: noteId },
      data: {
        tags: {
          deleteMany: { id: tagId },
        },
      },
    });
  } catch (error) {
    return null;
  }
}
