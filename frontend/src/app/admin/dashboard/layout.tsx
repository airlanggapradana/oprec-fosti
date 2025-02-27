"use client";
import { getCookie } from "@/utils/cookies";
import React from "react";
import { redirect } from "next/navigation";
import { validateTokenExpiration } from "@/utils/helper";
import { SearchProvider } from "@/context/search-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Main } from "@/components/layout/main";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookie = await getCookie("token");
  // if (!cookie) return redirect("/admin");

  // const verifyToken = validateTokenExpiration(cookie);
  // if (!verifyToken.valid) return redirect("/admin");

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
          )}
        >
          <Header>
            <div className="flex space-x-2">
              <SidebarTrigger
                variant="outline"
                className="scale-125 sm:scale-100"
              />
              <Separator orientation="vertical" className="h-6" />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <Main>{children}</Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
