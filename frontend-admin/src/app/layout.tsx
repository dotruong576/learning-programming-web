import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProCode: Code like a pro",
  description:
    "Want to learn how to code like a professional? Check out our websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"bg-main-color"}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
