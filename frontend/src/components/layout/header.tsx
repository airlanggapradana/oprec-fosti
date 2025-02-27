"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "shadow-2lg mr-3 mt-2 flex h-16 items-center gap-3 rounded-md border border-sidebar-border bg-sidebar p-4 text-sidebar-foreground shadow-2xl shadow-black/10 sm:gap-4",
        fixed &&
          "header-fixed peer/header fixed z-50 justify-between rounded-md",
        offset > 10 && fixed ? "shadow" : "shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
};

Header.displayName = "Header";
