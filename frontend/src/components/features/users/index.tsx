"use client";

import UserTableSkeleton from "@/components/skeletons/user-table-skeleton";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersTable } from "./components/users-table";
import UsersProvider from "./context/users-context";
import { User } from "./data/schema";

import { getRecords } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function Users({ token }: { token: string }) {
  // Parse user list

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getRecords(token),
  });

  return (
    <UsersProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">List Pendaftar</h2>
          <p className="text-muted-foreground">
            Daftar Mahasiswa yang sudah mendaftar
          </p>
        </div>
        <UsersPrimaryButtons />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        {isLoading ? (
          <UserTableSkeleton />
        ) : data?.result === null ? (
          <div>No data</div>
        ) : (
          <UsersTable
            data={data?.result?.data as unknown as User[] | []}
            columns={columns}
          />
        )}
      </div>

      <UsersDialogs token={token} />
    </UsersProvider>
  );
}
