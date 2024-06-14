import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Call Analytics",
  description: "Make the most out of your call data",
};

function HeaderBar() {
  return (
    <>
      <div className="flex w-full">
        <Navigation />
      </div>
    </>
  )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
       <body className={`${inter.className}`}>
          <HeaderBar />
          {children}
      </body>
    </html>
  );
}
