"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import navItems from "./navItems";

export default function SearchBar() {
  const [showSearchCommand, setShowSearchCommand] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowSearchCommand((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        className="justify-between text-slate-400 hover:text-slate-800"
        variant="outline"
        onClick={() => setShowSearchCommand(true)}
      >
        <div className="flex items-center gap-3">
          <MagnifyingGlassIcon />
          <span>Search</span>
        </div>
        <span>⌘K</span>
      </Button>
      <CommandDialog
        open={showSearchCommand}
        onOpenChange={setShowSearchCommand}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <CommandItem
                  onSelect={() => {
                    router.push(item.href);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
