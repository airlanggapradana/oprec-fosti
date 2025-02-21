import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ThemeToggle } from "./ThemeToggle";
import DaftarBtn from "./DaftarBtn";

const navigations = [
  { name: "Home", href: "#home" },
  { name: "Tutorial", href: "#tutorial" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <Image
            alt="logo"
            src={logo}
            width={80}
            height={80}
            className="dark:invert"
          />
        </Link>
        <div className="flex items-center gap-7">
          {navigations.map((nav, index) => (
            <Link
              key={index}
              href={nav.href}
              className="text-sm font-semibold transition-colors hover:text-primary"
            >
              {nav.name}
            </Link>
          ))}
          <ThemeToggle />
          <DaftarBtn text="Daftar" size={"sm"} />
        </div>
      </div>
    </header>
  );
}
