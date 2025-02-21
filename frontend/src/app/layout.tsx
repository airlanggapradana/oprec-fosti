import MouseMoveEffect from "@/components/mouse-move-fx";
import "@/styles/globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/lib/ReactQuery";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Oprec Fosti 2025",
  description: "Website Open Recruitment FOSTI 2025",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
      <body className="bg-background text-foreground antialiased">
        <ReactQueryProvider>
          <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem>
            <MouseMoveEffect />
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
