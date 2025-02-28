import Dashboard from "@/components/features/dashboard";
import { getCookie } from "@/utils/cookies";
import React from "react";

export default async function DashboardPage() {
  const token = await getCookie("token");

  return (
    <div>
      <Dashboard token={token as string} />
    </div>
  );
}
