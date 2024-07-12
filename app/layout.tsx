import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "@/context/recoilContextProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChessPlay.com",
  description: "A realtime chess game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <RecoilContextProvider>
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </RecoilContextProvider>
    </html>
  );
}
