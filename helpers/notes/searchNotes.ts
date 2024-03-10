"use server";

import { prisma } from "@/lib/db";

export async function searchNotes(
  search: string,
  { includeDeleted = false, doNotIncludeNoteIds = [] as string[] } = {}
) {
  try {
    return prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
        id: { notIn: doNotIncludeNoteIds },
        deleted: includeDeleted ? true : false,
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}
