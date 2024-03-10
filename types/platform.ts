import { getNote } from "@/helpers/notes/getNote";

export type INote = NonNullable<Awaited<ReturnType<typeof getNote>>>;
