"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Main } from "@/components/layout/main";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/features/dashboard/header";

const queryClient = new QueryClient();

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <SidebarProvider className="relative z-30" defaultOpen={true}>
        <QueryClientProvider client={queryClient}>
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
            <DashboardHeader />
            <Main>{children}</Main>
          </div>
        </QueryClientProvider>
      </SidebarProvider>
    </SearchProvider>
  );
}
