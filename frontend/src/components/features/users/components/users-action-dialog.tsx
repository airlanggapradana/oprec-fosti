"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { facultyTypes, genderTypes, prodyType } from "../data/data";
import { User } from "../data/schema";
import { SelectDropdown } from "@/components/select-dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecord } from "@/utils/api";
import { toast } from "sonner";
import { USERS_QUERY_KEY } from "../data/constants";

const formSchema = z.object({
  nama: z.string().min(1, { message: "Name is required." }),
  nim: z.string().min(1, { message: "NIM is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email is invalid." }),
  no_telepon: z.string().min(1, { message: "Phone number is required." }),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"]),
  alamat: z.string().min(1, { message: "Address is required." }),
  motivasi: z.string().min(1, { message: "Motivation is required." }),
  fakultas: z.string().min(1, { message: "Faculty is required." }),
  prodi: z.string().min(1, { message: "Prodi is required." }),
  isEdit: z.boolean(),
});

export type UserForm = z.infer<typeof formSchema>;

type UsersQueryData = {
  result: {
    data: User[];
  };
};
interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string;
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
  token,
}: Props) {
  const isEdit = !!currentRow;
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit: false,
        }
      : {
          nama: "",
          email: "",
          nim: "",
          no_telepon: "",
          gender: "LAKI_LAKI",
          alamat: "",
          motivasi: "",
          fakultas: "",
          prodi: "",
          isEdit: false,
        },
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: UserForm) => {
      const response = await updateRecord(
        currentRow?.id as string,
        data,
        token,
      );
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(response.error as string);
      }
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(USERS_QUERY_KEY, (oldData: UsersQueryData) => {
        const updatedUsers = oldData.result.data.map((user: User) =>
          user.id === currentRow?.id
            ? { ...user, ...response.result.data }
            : user,
        );
        return {
          ...oldData,
          result: { ...oldData.result, data: updatedUsers },
        };
      });

      toast.success("User berhasil diubah!");
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`User gagal diubah : ${error.message}`);
      form.setError("nama", { message: error.message }, { shouldFocus: true });
      form.setError(
        "email",
        { message: error.message },
        { shouldFocus: false },
      );
    },
  });
  const onSubmit = (values: UserForm) => {
    mutateAsync(values);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the user here. " : "Create new user here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">NIM</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234567890"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_telepon"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="081234567890"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jl. Raya No. 123, Jakarta"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motivasi"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Motivation
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="I want to learn more about programming"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fakultas"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Faculty
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a role"
                      className="col-span-4"
                      items={facultyTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prodi"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Prodi
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a role"
                      className="col-span-4"
                      items={prodyType.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
