"use server";

import { prisma } from "@/lib/db";

export async function searchNotes(
  search: string,
  { includeDeleted = false, doNotInclude = [] as string[] } = {}
) {
  try {
    return prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
        id: { notIn: doNotInclude },
        deleted: includeDeleted ? true : false,
      },
    });
  } catch (error) {
    return [];
  }
}
