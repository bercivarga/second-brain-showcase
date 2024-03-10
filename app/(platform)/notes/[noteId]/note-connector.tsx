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
import { searchNotes } from "@/helpers/notes/searchNotes";

type Props = {
  noteId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

type NotesSearchResult = Awaited<ReturnType<typeof searchNotes>>;

export default function NoteConnector({ noteId, open, setOpen }: Props) {
  const [results, setResults] = useState<NotesSearchResult>([]);

  const router = useRouter();

  async function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const search = event.target.value;

    const results = await searchNotes(search, {
      doNotInclude: [noteId],
    });

    if (!results) return;

    setResults(results);
  }

  const debouncedHandleSearchChange = debounce(handleSearchChange, 500);

  async function handleConnectNotes(relatedNoteId: string) {
    await connectNotes(noteId, relatedNoteId);
    router.refresh();
    setOpen(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
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
