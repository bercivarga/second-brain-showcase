import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map of your notes",
  description: "Explore your notes and their relationships.",
};

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative h-screen w-full">{children}</div>;
}
