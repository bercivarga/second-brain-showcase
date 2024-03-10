import { getAllNotes } from "@/helpers/notes/getAllNotes";

import InteractiveMap from "./interactive-map";

export default async function MapPage() {
  const notes = await getAllNotes();

  return (
    <main className="relative h-screen w-full">
      <InteractiveMap notes={notes ?? []} />
    </main>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
