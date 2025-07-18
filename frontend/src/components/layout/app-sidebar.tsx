"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layout/nav-group";
import { sidebarData } from "./data/sidebar-data";
import logo from "../../../public/logo.png";
import logoPutih from "../../../public/LOGO FOSTI PUTIH.png";
import Image from "next/image";
import LogoutBtn from "../LogoutBtn";
import { useTheme } from "next-themes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const theme = useTheme();
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <div className="w-full py-3">
          <Image
            src={theme.theme === "light" ? logo : logoPutih}
            alt="logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <LogoutBtn />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
