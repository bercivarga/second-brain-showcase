import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

import LandingBgAnimation from "./landing-bg-animation";

export const metadata: Metadata = {
  title: "Second Brain | Home",
  description: "This is a showcase portfolio project. Made by @berci.dev",
};

export default function Home() {
  const { userId } = auth();

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <LandingBgAnimation isSignedIn={!!userId} />
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-slate-400">
        This is a showcase portfolio project, inspired by{" "}
        <a
          href="https://reflect.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Reflect
        </a>
        <br />
        Made by{" "}
        <a
          href="https://berci.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          @berci.dev
        </a>
      </p>
    </main>
  );
}
