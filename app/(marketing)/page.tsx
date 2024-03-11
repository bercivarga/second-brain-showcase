import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Second Brain | Home",
  description: "This is a showcase portfolio project. Made by @berci.dev",
};

export default function Home() {
  const { userId } = auth();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 p-6 md:items-center md:text-center">
        <h2>
          Welcome to your
          <br /> Second Brain
        </h2>
        <p>
          {userId
            ? "Click on the button to proceed to the platform."
            : "Sign in or sign up in order to explore the app."}
        </p>
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
    </main>
  );
}
