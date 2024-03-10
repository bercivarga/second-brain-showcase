"use server";

import { auth } from "@clerk/nextjs";

import { prisma } from "@/lib/db";

export async function searchTags(
  search: string,
  { doNotIncludeTagIds = [] as string[] } = {}
) {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return [];
    }

    return prisma.tag.findMany({
      where: {
        ownerId: {
          equals: dbUser.id,
        },
        id: { notIn: doNotIncludeTagIds },
        name: { contains: search, mode: "insensitive" },
      },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    return [];
  }
}
