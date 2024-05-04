import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shenanigator",
  description: "Voor alle Vrijdag Online shenanigans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base-100">
        <Navbar />
        <div className="w-full flex justify-center">
          <div className="w-3/4 py-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
