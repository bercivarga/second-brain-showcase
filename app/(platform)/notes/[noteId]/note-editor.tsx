"use client";

import debounce from "lodash.debounce";
import { useState } from "react";

import { updateNoteContent } from "@/helpers/notes/updateNoteContent";
import { updateNoteTitle } from "@/helpers/notes/updateNoteTitle";
import { INote } from "@/types/platform";

type Props = {
  note: INote;
};

const debounceDelay = 500;
const debouncedUpdateNoteTitle = debounce(updateNoteTitle, debounceDelay);
const debouncedUpdateNoteContent = debounce(updateNoteContent, debounceDelay);

export default function NoteEditor({ note }: Props) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <div className="flex h-full min-h-screen w-full divide-x">
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
          placeholder="Write your note here..."
          onChange={(e) => {
            setContent(e.target.value);
            debouncedUpdateNoteContent(note.id, {
              content: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}
