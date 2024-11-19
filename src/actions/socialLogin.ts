"use server";

import { auth, signIn, signOut } from "../../auth";

export async function loginWithGoogle() {
  await signIn("google");
}
export async function loginWithGithub() {
  await signIn("github");
}

export async function logOut() {
  await signOut({ redirectTo: "/signin" });
  localStorage.clear();
  window.location.reload();
}

export async function currentUserId() {
  const session = await auth();
  return session?.user?._id;
}
