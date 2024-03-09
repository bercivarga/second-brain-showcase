"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { deleteNote } from "@/helpers/notes/deleteNote";
import { getNote } from "@/helpers/notes/getNote";
import { updateNoteContent } from "@/helpers/notes/updateNoteContent";
import { updateNoteTitle } from "@/helpers/notes/updateNoteTitle";

type Props = {
  note: NonNullable<Awaited<ReturnType<typeof getNote>>>; // I love TS
};

const debounceDelay = 500;
const debouncedUpdateNoteTitle = debounce(updateNoteTitle, debounceDelay);
const debouncedUpdateNoteContent = debounce(updateNoteContent, debounceDelay);

export default function NoteEditor({ note }: Props) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const router = useRouter();

  async function handleDeleteNote() {
    const deletedNote = await deleteNote(note.id);
    if (!deletedNote) {
      alert("Failed to delete note"); // TODO: better error handling with a toast
      return;
    }
    router.push("/notes");
  }

  return (
    <div className="flex h-full min-h-screen divide-x">
      <div className="flex w-full flex-col gap-6 p-6">
        <input
          className="text-4xl font-bold outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            debouncedUpdateNoteTitle(note.id, {
              title: e.target.value,
            });
          }}
        />
        <textarea
          className="h-96 resize-none text-lg outline-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            debouncedUpdateNoteContent(note.id, {
              content: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex w-80 flex-col items-stretch gap-4 bg-slate-100/50 p-6">
        <span className="block text-sm text-slate-400">Note actions</span>
        <Button
          className="w-full justify-start"
          variant={"destructive"}
          onClick={handleDeleteNote}
        >
          <TrashIcon className="mr-3" />
          Delete note
        </Button>
      </div>
    </div>
  );
}
