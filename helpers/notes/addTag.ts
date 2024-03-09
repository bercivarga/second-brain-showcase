import { prisma } from "@/lib/db";

export async function addTag(noteId: string, tagName: string) {
  const convertedTagName = tagName.toLowerCase().split(" ").join("-");

  try {
    let tag = await prisma.tag.findFirst({
      where: { name: convertedTagName },
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: convertedTagName },
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
