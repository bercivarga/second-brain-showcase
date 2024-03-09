import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp afterSignUpUrl={"/api/sign-up"} />;
}
