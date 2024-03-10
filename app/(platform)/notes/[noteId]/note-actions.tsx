"use client";

import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <div className="flex w-80 flex-col bg-slate-100/50 p-6 text-sm text-slate-400">
      <div className="flex flex-col items-stretch gap-4">
        <span className="block">Connected notes</span>
        {note.relatedNotes.length === 0 ? (
          <span className="text-xs text-slate-400">No connected notes yet</span>
        ) : (
          <ul className="flex flex-col gap-2">
            {note.relatedNotes.map((relatedNote) => (
              <li key={relatedNote.id} className="font-semibold text-slate-800">
                <Link href={`/notes/${relatedNote.id}`} prefetch={false}>
                  {relatedNote.title.length > 20
                    ? `${relatedNote.title.slice(0, 20)}...`
                    : relatedNote.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Button
          className="w-full justify-start"
          variant={"outline"}
          size={"sm"}
        >
          <PlusCircledIcon className="mr-3" />
          Connect notes
        </Button>
      </div>
      <hr className="my-6 border-t border-slate-200" />
      <div className="flex flex-col items-stretch gap-4">
        <span className="block">Tags</span>
        {note.tags.length === 0 ? (
          <span className="text-xs text-slate-400">No tags yet</span>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <li
                key={tag.id}
                className="rounded-full bg-slate-200 px-3 py-1 text-sm"
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
        <Button
          className="w-full justify-start"
          variant={"outline"}
          size={"sm"}
        >
          <PlusCircledIcon className="mr-3" />
          Manage tags
        </Button>
      </div>
      <hr className="my-6 border-t border-slate-200" />
      <div className="flex flex-col items-stretch gap-4">
        <span className="block">Note actions</span>
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
