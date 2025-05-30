import { Separator } from "@/components/ui/separator";

import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { User } from "lucide-react";
import { TbTools } from "react-icons/tb";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/features/settings/components/sidebar-nav";
import { MdDisplaySettings } from "react-icons/md";

export default function Settings({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ===== Top Heading ===== */}

      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1 pr-4">
            {children}
          </div>
        </div>
      </Main>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <User size={18} />,
    href: "/admin/dashboard/settings/profile",
  },
  {
    title: "Account",
    icon: <TbTools size={18} />,
    href: "/admin/dashboard/settings/account",
  },
  {
    title: "Appearance",
    icon: <MdDisplaySettings size={18} />,
    href: "/admin/dashboard/settings/appearance",
  },
];
