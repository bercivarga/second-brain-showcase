import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

async function getNote(noteId: string) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    return note;
  } catch (error) {
    return null;
  }
}

export default async function EditNotePage({
  params,
}: {
  params: { noteId: string };
}) {
  const { noteId } = params;

  const note = await getNote(noteId);

  if (!note) {
    redirect("/notes");
  }

  return (
    <main>
      <h1>Edit note</h1>
      <pre>
        <code>{JSON.stringify(note, null, 2)}</code>
      </pre>
    </main>
  );
}
