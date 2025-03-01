import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardContext, useDashboardContext } from "@/hooks/context";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function RecentSales() {
  const data = React.useContext(DashboardContext);
  if (!data) return <p>No Data Found.</p>;
  return (
    <div className="space-y-8">
      {data?.result?.data
        .filter((time) => {
          const tenDaysAgo = new Date();
          tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
          return new Date(time.createdAt) >= tenDaysAgo;
        })
        .map((user) => (
          <div className="flex items-center gap-4" key={user.id}>
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {user.nama.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-wrap items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none md:text-base">
                  {user.nama}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm font-medium text-muted-foreground md:text-base">
                  {user.prodi === "TEKNIK_INFORMATIKA"
                    ? "Informatika"
                    : user.prodi === "SISTEM_INFORMASI"
                      ? "Sistem Informasi"
                      : "Ilmu Komunikasi"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {format(new Date(user.createdAt), "PPPP", { locale: id })}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
