import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import LandingBgAnimation from "./landing-bg-animation";

export const metadata: Metadata = {
  title: "Second Brain | Home",
  description: "This is a showcase portfolio project. Made by @berci.dev",
};

export default function Home() {
  const { userId } = auth();

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <LandingBgAnimation />
      </div>
      <div className="flex flex-col gap-4 p-6 text-white md:items-center md:text-center">
        <h2>
          Welcome to your
          <br /> Second Brain
        </h2>
        {!userId && <p>Sign in or sign up in order to explore the app.</p>}
        <div className="flex gap-2">
          {userId ? (
            <Link href="/notes">
              <Button>To notes</Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button>Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
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
