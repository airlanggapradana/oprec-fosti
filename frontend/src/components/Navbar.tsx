"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import logoPutih from "../../public/LOGO FOSTI PUTIH.png";
import { ThemeToggle } from "./ThemeToggle";
import DaftarBtn from "./DaftarBtn";
import { MenuSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const navigations = [
  { name: "Home", href: "#home" },
  { name: "Tutorial", href: "#tutorial" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const isAdminDashboard = pathname.includes("/admin/dashboard");
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isAdminDashboard ? "hidden" : ""}`}
    >
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-5">
        <Link href="/">
          {theme === "dark" ? (
            <Image alt="logo" src={logoPutih} width={80} height={80} />
          ) : (
            <Image alt="logo" src={logo} width={80} height={80} />
          )}
        </Link>
        <div className="hidden items-center gap-7 md:flex">
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
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <DaftarBtn text="Daftar" size={"sm"} />
          <Sheet>
            <SheetTrigger>
              <MenuSquare size={35} />
            </SheetTrigger>
            <SheetContent className="w-3/4">
              <SheetHeader className="mt-5 border-b-2 pb-3">
                <SheetTitle>
                  <Image
                    alt="logo"
                    src={logo}
                    width={100}
                    height={100}
                    className="dark:invert"
                  />
                </SheetTitle>
              </SheetHeader>
              <SheetDescription className="mt-5 flex flex-col gap-12">
                {navigations.map((nav, index) => (
                  <Link
                    key={index}
                    href={nav.href}
                    className="w-full rounded-md border-r-4 p-3 text-lg font-bold transition-colors hover:text-primary"
                  >
                    {nav.name}
                  </Link>
                ))}
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
