"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { deleteNote } from "@/helpers/notes/deleteNote";
import { INote } from "@/types/platform";

type Props = {
  note: INote;
};

export default function NoteActions({ note }: Props) {
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
    <div className="flex w-80 flex-col justify-between bg-slate-100/50 p-6">
      <div className="flex flex-col items-stretch gap-4">
        <span className="block text-sm text-slate-400">Connected notes</span>
      </div>
      <div className="flex flex-col items-stretch gap-4">
        <span className="block text-sm text-slate-400">Note actions</span>
        <Button
          className="w-full justify-start"
          variant={"destructive"}
          onClick={handleDeleteNote}
        >
          <TrashIcon className="mr-3" />
          Move to trash
        </Button>
      </div>
    </div>
  );
}
