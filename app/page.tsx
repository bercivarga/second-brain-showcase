import { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CLEVER°FRANKE Assignment",
  description: "Made for Clever Franke by Berci Varga",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Hello world</h1>
      <h2>Hello world</h2>
      <h3>Hello world</h3>
      <h4>Hello world</h4>
      <h5>Hello world</h5>
      <h6>Hello world</h6>
      <p>This is a paragraph</p>
      <Button>Click me</Button>
    </main>
  );
}
