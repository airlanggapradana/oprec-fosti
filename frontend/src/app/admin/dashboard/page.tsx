import React from "react";
import LogoutBtn from "@/components/LogoutBtn";
import ParaPendaftar from "@/components/ParaPendaftar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader className="flex items-start">
        <CardTitle className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
          Dashboard Admin
        </CardTitle>
        <LogoutBtn />
      </CardHeader>
      <CardContent>
        <ParaPendaftar />
      </CardContent>
    </Card>
  );
}
