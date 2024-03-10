"use client";

import { useEffect, useRef, useState } from "react";
import { ForceGraph3D } from "react-force-graph";

import { getAllNotes } from "@/helpers/notes/getAllNotes";
import { prepareNoteRelations } from "@/helpers/notes/prepareNoteRelations";

type Props = {
  notes: NonNullable<Awaited<ReturnType<typeof getAllNotes>>>;
};

type GraphData = {
  nodes: {
    id: string;
    name: string;
    val: number;
  }[];
  links: {
    source: string;
    target: string;
  }[];
};

function createLinksFromAllNotes(notes: Props["notes"]): GraphData["links"] {
  return notes
    .map((note) => {
      return prepareNoteRelations(note).map((link) => ({
        source: note.id,
        target: link.id,
      }));
    })
    .flat();
}

function prepareNotesForGraph(notes: Props["notes"]): GraphData {
  const nodes = notes.map((note) => ({
    id: note.id,
    name: note.title,
    val: 1,
  }));

  const links = createLinksFromAllNotes(notes);

  return { nodes, links };
}

export default function InteractiveMap({ notes }: Props) {
  const [data, setData] = useState<GraphData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graphData = prepareNotesForGraph(notes);
    setData(graphData);
  }, [notes]);

  if (!data)
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white"
        ref={containerRef}
      >
        <div>Loading...</div>
      </div>
    );

  return (
    <div
      className="absolute inset-0 hover:cursor-grab active:cursor-grabbing"
      ref={containerRef}
    >
      <ForceGraph3D
        width={containerRef.current?.clientWidth ?? 0}
        height={containerRef.current?.clientHeight ?? 0}
        graphData={data}
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleColor={() => "rgba(255, 255, 255, 0.5)"}
      />
    </div>
  );
}
