import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Second Brain | Sign in",
};

export default function SignInPage() {
  return <SignIn redirectUrl={"/notes"} />;
}
