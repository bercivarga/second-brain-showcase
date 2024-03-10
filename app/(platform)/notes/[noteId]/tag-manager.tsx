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
import { addTag } from "@/helpers/notes/addTag";
import { searchTags } from "@/helpers/notes/searchTags";
import { INote } from "@/types/platform";

type TagsSearchResult = Awaited<ReturnType<typeof searchTags>>;

type Props = {
  note: INote;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function TagManager({ note, open, setOpen }: Props) {
  const [results, setResults] = useState<TagsSearchResult>([]);
  const [localSearch, setLocalSearch] = useState("");

  const router = useRouter();

  const { id: noteId } = note;

  const existingTags = note.tags.map((tag) => tag.id);

  async function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const search = event.target.value;
    setLocalSearch(search);

    const results = await searchTags(search, {
      doNotIncludeTagIds: [...existingTags],
    });

    if (!results) return;

    setResults(results);
  }

  const debouncedHandleSearchChange = debounce(handleSearchChange, 500);

  async function handleAddTag(tagId: string) {
    await addTag(noteId, tagId);
    router.refresh();
    setOpen(false);
  }

  function handleClose() {
    setResults([]);
    setLocalSearch("");
    setOpen(false);
  }

  const showTagCreationSuggestion = !!localSearch;

  return (
    <CommandDialog open={open} onOpenChange={handleClose}>
      <CommandInput
        onInput={debouncedHandleSearchChange}
        placeholder="Type a tag's name to search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          {!!results.length && (
            <CommandGroup heading="Suggestions">
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleAddTag(result.name)}
                  className="cursor-pointer"
                >
                  {result.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {showTagCreationSuggestion && (
            <CommandGroup heading="Create tag">
              <CommandItem
                onSelect={() => handleAddTag(localSearch)}
                className="cursor-pointer"
              >
                {localSearch}
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandList>
    </CommandDialog>
  );
}
