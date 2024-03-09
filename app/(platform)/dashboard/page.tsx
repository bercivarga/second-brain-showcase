import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Start working on your ideas here.",
};

export default function Home() {
  return (
    <main className="px-6 py-4">
      <h2>Dashboard</h2>
      <p>
        Welcome to your dashboard. This is where you can start working on your
        ideas. You can create new notes, view your recent notes, and more.
      </p>
    </main>
  );
}
