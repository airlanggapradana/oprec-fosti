import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { type SidebarData } from "../types";
import { TbChecklist } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUserCog } from "react-icons/lu";
import { FiTool } from "react-icons/fi";
import { LuPalette } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbBrowserCheck } from "react-icons/tb";
import { MdOutlineHelpCenter } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

export const sidebarData: SidebarData = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LuLayoutDashboard,
        },
        {
          title: "Users",
          url: "/admin/dashboard/user-register",
          icon: TbChecklist,
        },
      ],
    },
  ],
};
