import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getNote } from "@/helpers/notes/getNote";

import NoteEditor from "./note-editor";

type Props = {
  params: { noteId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { noteId } = params;
  const note = await getNote(noteId);

  if (!note) {
    return {
      title: "Note not found",
    };
  }

  return {
    title: `Edit note: ${note.title}`,
  };
}

export default async function EditNotePage({ params }: Props) {
  const { noteId } = params;
  const note = await getNote(noteId);

  if (!note) {
    redirect("/notes");
  }

  return (
    <main>
      <NoteEditor note={note} />
    </main>
  );
}
