"use client";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <Header>
      <div className="flex space-x-2">
        <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
        <Separator orientation="vertical" className="h-6" />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </Header>
  );
}
