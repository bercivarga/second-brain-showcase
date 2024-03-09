import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

async function getAllNotes() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { notes: true },
    });

    if (!dbUser) {
      return null;
    }

    return dbUser.notes;
  } catch (error) {
    return null;
  }
}

export default async function AllNotesPage() {
  const notes = await getAllNotes();

  return (
    <main>
      <h1>All notes</h1>
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
