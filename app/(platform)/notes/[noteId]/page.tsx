import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getNote } from "@/helpers/notes/getNote";

import NoteActions from "./note-actions";
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

  if (!note || note.deleted) {
    redirect("/notes");
  }

  return (
    <main className="flex h-full min-h-screen w-full divide-x">
      <NoteEditor note={note} />
      <NoteActions note={note} />
    </main>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
