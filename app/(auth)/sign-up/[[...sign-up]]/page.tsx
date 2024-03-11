import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Second Brain | Sign up",
};

export default function SignUpPage() {
  return <SignUp afterSignUpUrl={"/api/sign-up"} />;
}
