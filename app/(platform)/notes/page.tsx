import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Edit2Icon, Edit3Icon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllNotes } from "@/helpers/notes/getAllNotes";

export default async function AllNotesPage() {
  const notes = await getAllNotes();

  return (
    <main>
      <Table>
        <TableCaption>A list of your recent notes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="w-[300px]">Snippet</TableHead>
            <TableHead className="w-[200px]">Tags</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes?.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link href={`/notes/${note.id}`}>{note.title}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/notes/${note.id}`}>
                  {note.content.slice(0, 50)}
                </Link>
              </TableCell>
              <TableCell>
                {note.tags.map((tag) => tag.name).join(", ")}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/notes/${note.id}`}>
                  {new Date(note.updatedAt).toLocaleString()}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
