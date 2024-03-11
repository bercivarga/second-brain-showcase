"use client";

import { ResetIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { restoreNote } from "@/helpers/notes/restoreNote";

type Props = {
  noteId: string;
};

export default function RestoreButton({ noteId }: Props) {
  const router = useRouter();

  async function handleRestore() {
    await restoreNote(noteId);
    router.refresh();
  }

  return (
    <Button variant="outline" size="icon" onClick={handleRestore}>
      <ResetIcon />
    </Button>
  );
}
