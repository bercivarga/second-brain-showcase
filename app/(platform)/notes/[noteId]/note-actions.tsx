"use client";

import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/helpers/notes/deleteNote";
import { disconnectNotes } from "@/helpers/notes/disconnectNotes";
import { prepareNoteRelations } from "@/helpers/notes/prepareNoteRelations";
import { INote } from "@/types/platform";

import NoteConnector from "./note-connector";

type Props = {
  note: INote;
};

export default function NoteActions({ note }: Props) {
  const [showNoteConnector, setShowNoteConnector] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);

  const router = useRouter();

  async function handleDeleteNote() {
    const deletedNote = await deleteNote(note.id);

    if (!deletedNote) {
      alert("Failed to delete note"); // TODO: better error handling with a toast
      return;
    }

    router.push("/notes");
  }

  async function handleDisconnectNote(toDisconnectId: string) {
    const disconnectedNote = await disconnectNotes(note.id, toDisconnectId);

    if (!disconnectedNote) {
      alert("Failed to disconnect note"); // TODO: better error handling with a toast
      return;
    }

    router.refresh();
  }

  const noteRelations = prepareNoteRelations(note);

  return (
    <>
      <div className="flex w-80 flex-col bg-slate-100/50 p-6 text-sm text-slate-400">
        <div className="flex flex-col items-stretch gap-4">
          <span className="block">Connected notes</span>
          {noteRelations.length === 0 ? (
            <span className="text-xs text-slate-400">
              No connected notes yet
            </span>
          ) : (
            <ul className="flex flex-col gap-2">
              {noteRelations.map((relatedNote) => (
                <li
                  key={relatedNote.id}
                  className="flex w-full items-center justify-between"
                >
                  <Link href={`/notes/${relatedNote.id}`} prefetch={false}>
                    <Button
                      className="w-full justify-start p-0"
                      variant={"link"}
                      size={"sm"}
                    >
                      {relatedNote.title.length > 32
                        ? `${relatedNote.title.slice(0, 32)}...`
                        : relatedNote.title}
                    </Button>
                  </Link>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    onClick={() => handleDisconnectNote(relatedNote.id)}
                  >
                    <TrashIcon />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button
            className="w-full justify-start"
            variant={"outline"}
            size={"sm"}
            onClick={() => setShowNoteConnector(true)}
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
                  <Badge variant="outline">{tag.name}</Badge>
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
      <NoteConnector
        note={note}
        open={showNoteConnector}
        setOpen={setShowNoteConnector}
      />
    </>
  );
}
