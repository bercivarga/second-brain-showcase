import { INote } from "@/types/platform";

export function prepareNoteRelations(
  note: INote
): INote["relatedNotes" | "relatedTo"] {
  const { relatedNotes, relatedTo } = note;

  const buffer = [...relatedNotes];

  relatedTo.forEach((relatedNote) => {
    if (!buffer.find((note) => note.id === relatedNote.id)) {
      buffer.push(relatedNote);
    }
  });

  return buffer;
}
