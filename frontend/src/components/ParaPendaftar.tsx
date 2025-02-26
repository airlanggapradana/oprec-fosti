"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteRecord, getRecords } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const ParaPendaftar = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const token = await getCookie("token");
      return getRecords(token as string);
    },
    queryKey: ["records"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const token = await getCookie("token");
      return deleteRecord(id, token as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>No data...</div>;
  const result = data.result;
  const paraPendaftar = result?.data;
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-sm">
          <TableHead>No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>NIM</TableHead>
          <TableHead>Fakultas</TableHead>
          <TableHead>Prodi</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paraPendaftar ? (
          paraPendaftar.map((item, index) => (
            <TableRow className="text-base" key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.nim}</TableCell>
              <TableCell>{item.fakultas}</TableCell>
              <TableCell>{item.prodi}</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => mutateAsync(item.id)}
                  disabled={isPending}
                >
                  <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>No data...</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ParaPendaftar;
