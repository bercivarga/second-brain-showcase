import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
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

import NotesPagination from "./notes-pagination";

type Props = {
  params: {};
  searchParams: { page?: string };
};

export const metadata: Metadata = {
  title: "All notes",
};

export default async function AllNotesPage({ searchParams }: Props) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const { count, notes, totalPages } =
    (await getAllNotes({
      page: currentPage,
      paginate: true,
    })) ?? {};

  return (
    <main className="px-6 py-4">
      <div className="flex w-full items-center justify-between ">
        <h5 className="font-bold">Notes</h5>
        <div className="flex items-center gap-4">
          <Link href="/notes/trash">
            <Button variant="outline" className="gap-2">
              <TrashIcon />
              Trash bin
            </Button>
          </Link>
          <Link href="/notes/new">
            <Button className="gap-2">
              <PlusCircledIcon />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <Table className="mt-4">
        <TableCaption>
          A list of your recent notes (showing {notes?.length ?? 0} of {count})
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="w-[300px]">Snippet</TableHead>
            <TableHead className="w-[300px]">Tags</TableHead>
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
              <TableCell className="max-w-[300px] overflow-hidden overflow-ellipsis">
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
      <NotesPagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
