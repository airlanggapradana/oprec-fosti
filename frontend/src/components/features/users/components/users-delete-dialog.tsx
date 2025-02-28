"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { User } from "../data/schema";
import { AlertCircle } from "lucide-react";
import { deleteRecord } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USERS_QUERY_KEY } from "../data/constants";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
  token: string;
}

type UsersQueryData = {
  result: {
    data: User[];
  };
};

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
  token,
}: Props) {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await deleteRecord(currentRow.id, token);
      return response;
    },
    onSuccess: async () => {
      // Update cache by removing the deleted user
      queryClient.setQueryData(USERS_QUERY_KEY, (oldData: UsersQueryData) => {
        const filteredUsers = oldData.result.data.filter(
          (user) => user.id !== currentRow.id,
        );
        return {
          ...oldData,
          result: { ...oldData.result, data: filteredUsers },
        };
      });

      toast.success("User berhasil dihapus!");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`User gagal dihapus : ${error.message}`);
    },
  });
  const handleDelete = () => {
    if (value.trim() !== currentRow.nama) return;
    mutateAsync();
    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.nama}
      title={
        <span className="text-destructive">
          <AlertCircle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete User
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.nama}</span>?
            <br />
            This action will permanently remove the user with the NIM of{" "}
            <span className="font-bold">
              {currentRow.nim.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Nama:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter nama to confirm deletion."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
