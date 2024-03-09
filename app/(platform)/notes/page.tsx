import { Metadata } from "next";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "All notes",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function AllNotesPage() {
  const notes = await getAllNotes();

  return (
    <main className="px-6 py-4">
      <Table>
        <TableCaption>A list of your recent notes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="w-[300px]">Snippet</TableHead>
            <TableHead className="w-[200px]">Tags</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap">
          {notes?.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link href={`/notes/${note.id}`}>
                  {note.title.length > 20
                    ? note.title.slice(0, 20) + "..."
                    : note.title}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/notes/${note.id}`}>
                  {note.content.length > 50
                    ? note.content.slice(0, 50) + "..."
                    : note.content}
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
