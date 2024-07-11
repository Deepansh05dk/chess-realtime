import { Button } from "@/components/ui/button";
import React from "react";
import { signIn, auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";


export async function Navbar() {
  const session = await auth();
  return (
    <header className="w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <Logo />
          </div>
          <div className=" flex  gap-4  flex-row items-center">
            <form
              action={async () => {
                "use server";
                const user = await signIn("google");
                console.log(user);
              }}
            >
              {session ? (
                <Button
                  className="bg-slate-500"
                  type="submit"
                  formAction={async () => {
                    "use server";
                    await signOut();
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
                    console.log(user);
                  }}
                >
                  <img
                    src="./google.svg"
                    alt="google icon"
                    className="w-4 h-4 mr-2"
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
