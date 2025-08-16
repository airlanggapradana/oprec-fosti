import MouseMoveEffect from "@/components/mouse-move-fx";
import "@/styles/globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/lib/ReactQuery";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import React from "react";

export const metadata: Metadata = {
  title: "Oprec Fosti 2025",
  description: "Website Open Recruitment FOSTI 2025",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable} scroll-smooth`}
    >
      <body className="scroll-smooth bg-background text-foreground antialiased">
        <ReactQueryProvider>
          <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
            {/*<MouseMoveEffect />*/}
            <Navbar />
            {children}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
