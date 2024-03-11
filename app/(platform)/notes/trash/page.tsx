import { Metadata } from "next";

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

import NotesPagination from "../notes-pagination";
import RestoreButton from "./restore-button";

type Props = {
  params: {};
  searchParams: { page?: string };
};

export const metadata: Metadata = {
  title: "Trash bin",
};

export default async function TrashPage({ searchParams }: Props) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const { count, notes, totalPages } =
    (await getAllNotes({
      page: currentPage,
      paginate: true,
      results: "deleted",
    })) ?? {};

  return (
    <main className="px-6 py-4">
      <div>
        <h5 className="font-bold">Trash bin</h5>
      </div>
      <Table className="mt-4">
        <TableCaption>
          A list of your discarded notes (showing {notes?.length ?? 0} of{" "}
          {count})
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="w-[300px]">Snippet</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap">
          {notes?.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <RestoreButton noteId={note.id} />
              </TableCell>
              <TableCell>
                {note.title.length > 20
                  ? note.title.slice(0, 20) + "..."
                  : note.title}
              </TableCell>
              <TableCell>
                {note.content.length > 50
                  ? note.content.slice(0, 50) + "..."
                  : note.content}
              </TableCell>
              <TableCell className="text-right">
                {new Date(note.updatedAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NotesPagination
        type="trash"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
