import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

// Handles the sign-up process once the user is made and redirected by Clerk
export async function GET() {
  // Get the userId from auth() -- if null, the user is not signed in
  const currentUserData = await currentUser();

  if (!currentUserData) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id: userId, emailAddresses, username } = currentUserData;

  try {
    // Check if the user already exists in the database
    const user = await prisma.user.findUnique({
      where: { clerkId: currentUserData.id },
    });

    if (user) {
      return new NextResponse("User already exists", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("Error retrieving user from the database", {
      status: 500,
    });
  }

  try {
    // Create the user in the database using the Clerk user's data
    await prisma.user.create({
      data: {
        clerkId: userId,
        email: emailAddresses[0].emailAddress,
        name: username,
      },
    });
  } catch (error) {
    return new NextResponse("Error creating user", { status: 500 });
  }

  redirect("/notes");
}
