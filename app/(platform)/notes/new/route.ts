import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

// Handles the creation of a new note, fills the note up with placeholder data, then redirects the user
export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let newNoteId: string;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return new NextResponse("User in own database not found", {
        status: 404,
      });
    }

    const newNote = await prisma.note.create({
      data: {
        title: "New note",
        content: "Start writing here...",
        authorId: dbUser.id,
      },
    });

    const { id } = newNote;

    newNoteId = id;
  } catch (error) {
    return new NextResponse(
      `Error creating note: ${(error as Error).message}`,
      {
        status: 500,
      }
    );
  }

  // This is necessary to be done here because Next's app directory routing throws an error internally
  // that makes it impossible to use it in a try-catch block. Pretty annoying but this is the cleanest solution without a workaround.
  redirect(`/notes/${newNoteId}`);
}
