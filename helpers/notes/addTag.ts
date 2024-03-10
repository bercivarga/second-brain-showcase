"use server";

import { auth } from "@clerk/nextjs";

import { prisma } from "@/lib/db";

export async function addTag(noteId: string, tagName: string) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return null;
    }

    let tag = await prisma.tag.findFirst({
      where: { name: tagName, ownerId: dbUser.id },
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: tagName, ownerId: dbUser.id },
      });
    }

    const tagId = tag.id;

    return await prisma.note.update({
      where: { id: noteId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
    });
  } catch (error) {
    return null;
  }
}
