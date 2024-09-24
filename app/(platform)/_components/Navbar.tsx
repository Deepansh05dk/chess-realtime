import { Button } from "@/components/ui/button";
import React from "react";
import { signIn, auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";
import Image from "next/image";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-4 flex-row items-center">
            <form
              action={async () => {
                "use server";
                const user = await signIn("google");
              }}
            >
              {session ? (
                <Button
                  className="bg-slate-500"
                  type="submit"
                  formAction={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="bg-slate-500"
                  type="submit"
                  formAction={async () => {
                    "use server";
                    const user = await signIn("google");
                  }}
                >
                  <Image
                    src="./google.svg"
                    alt="google icon"
                    className="w-4 h-4 mr-2"
                    width={40}
                    height={40}
                  />
                  Login with Google
                </Button>
              )}
            </form>
            {session && (
              <Avatar>
                <AvatarImage src={session.user?.image || undefined} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
      <hr />
    </header>
  );
}
