"use server";

import { prisma } from "@/lib/db";

export async function disconnectNotes(note1Id: string, note2Id: string) {
  try {
    return await prisma.note.update({
      where: { id: note1Id },
      data: {
        relatedNotes: {
          disconnect: { id: note2Id },
        },
      },
    });
  } catch (error) {
    return null;
  }
}
