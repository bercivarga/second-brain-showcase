"use client";

import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { connectNotes } from "@/helpers/notes/connectNotes";
import { prepareNoteRelations } from "@/helpers/notes/prepareNoteRelations";
import { searchNotes } from "@/helpers/notes/searchNotes";
import { INote } from "@/types/platform";

type Props = {
  note: INote;
  open: boolean;
  setOpen: (open: boolean) => void;
};

type NotesSearchResult = Awaited<ReturnType<typeof searchNotes>>;

export default function NoteConnector({ note, open, setOpen }: Props) {
  const [results, setResults] = useState<NotesSearchResult>([]);

  const router = useRouter();

  const { id: noteId } = note;

  const existingNoteRelationIds = prepareNoteRelations(note).map(
    (note) => note.id
  );

  async function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const search = event.target.value;

    const results = await searchNotes(search, {
      doNotIncludeNoteIds: [...existingNoteRelationIds, noteId],
    });

    if (!results) return;

    setResults(results);
  }

  const debouncedHandleSearchChange = debounce(handleSearchChange, 500);

  async function handleConnectNotes(relatedNoteId: string) {
    await connectNotes(noteId, relatedNoteId);
    setOpen(false);
    router.refresh();
  }

  function handleClose() {
    setResults([]);
    setOpen(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={handleClose}>
      <CommandInput
        onInput={debouncedHandleSearchChange}
        placeholder="Type a note's name to search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          {!!results.length && (
            <CommandGroup heading="Suggestions">
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleConnectNotes(result.id)}
                  className="cursor-pointer"
                >
                  {result.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandList>
    </CommandDialog>
  );
}
