import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

type NoteData = Prisma.NoteCreateInput;

export async function updateNoteContent(
  noteId: string,
  data: Pick<NoteData, "title" | "content">
) {
  try {
    return await prisma.note.update({
      where: { id: noteId },
      data,
    });
  } catch (error) {
    return null;
  }
}
