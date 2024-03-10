"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

type NoteData = Prisma.NoteCreateInput;

export async function updateNoteTitle(
  noteId: string,
  data: Pick<NoteData, "title">
) {
  try {
    return await prisma.note.update({
      where: { id: noteId },
      data,
    });
  } catch (error) {
    return null;
  } finally {
    revalidatePath("/notes");
    revalidatePath(`/notes/${noteId}`, "page");
  }
}
