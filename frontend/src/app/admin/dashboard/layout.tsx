import { getCookie } from "@/utils/cookies";
import React from "react";
import { redirect } from "next/navigation";
import { validateTokenExpiration } from "@/utils/helper";

import ClientProvider from "./client-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await getCookie("token");
  if (!cookie) return redirect("/admin");

  const verifyToken = validateTokenExpiration(cookie);
  if (!verifyToken.valid) return redirect("/admin");

  return <ClientProvider>{children}</ClientProvider>;
}
