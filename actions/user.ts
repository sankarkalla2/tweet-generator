"use server";

import { signOut } from "@/auth";

export async function signOutUser() {
  try {
    await signOut({ redirectTo: "/sign-in", redirect: true });
    return { status: 200, message: "Signed out successfully" };
  } catch (error) {
    console.log("🔴", error);
    return { status: 500, message: "Internal server error" };
  }
}
