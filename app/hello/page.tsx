import React from "react";
import { SignIn } from "@/components/sign-in";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { Loader } from "@/components/Loader";
const HelloPage = async () => {
  const session = await auth();
  const signOutMy = async () => {
    "use server";
    await signOut();
  };
  return (
    <div>
      {JSON.stringify(session)}
      page 1
      <SignIn />
      <Loader />
      <form action={signOutMy}>
        <button
          type="submit"
          className="bg-red-100 px-3 py-1 rounded text-red-600"
        >
          signout
        </button>
      </form>
    </div>
  );
};

export default HelloPage;
