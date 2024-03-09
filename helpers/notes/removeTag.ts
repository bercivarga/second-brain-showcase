"use server";

import { prisma } from "@/lib/db";

export async function removeTag(noteId: string, tagName: string) {
  try {
    return await prisma.note.update({
      where: { id: noteId },
      data: {
        tags: {
          deleteMany: { name: tagName },
        },
      },
    });
  } catch (error) {
    return null;
  }
}
