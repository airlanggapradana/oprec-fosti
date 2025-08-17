"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruitmentSchema, RecruitmentSchema } from "@/zod/validation.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecord, sendEmail } from "@/utils/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormPendaftaran = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<RecruitmentSchema>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      nama: "",
      nim: "",
      email: "",
      no_telepon: "",
      alamat: "",
      gender: "LAKI_LAKI",
      motivasi: "",
      fakultas: "FKI",
      prodi: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: RecruitmentSchema) => {
      const response = await createRecord(data);
      if (response.status === 201) {
        return response;
      } else {
        throw new Error(response.error as string);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Pendaftaran berhasil!");
      await sendEmail({
        email: form.getValues("email"),
        nama: form.getValues("nama"),
        nim: form.getValues("nim"),
      });
      form.reset();
      router.push("/pendaftaran/success");
    },
    onError: (error) => {
      toast.error(`Pendaftaran gagal : ${error.message}`);
      form.setError("nim", { message: error.message }, { shouldFocus: true });
      form.setError(
        "email",
        { message: error.message },
        { shouldFocus: false },
      );
    },
  });

  const onSubmit: SubmitHandler<RecruitmentSchema> = async (data) => {
    await mutateAsync(data);
  };
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="text-start">
        <CardTitle>Formulir Pendaftaran Mahasiswa</CardTitle>
        <CardDescription>
          Silakan isi formulir pendaftaran di bawah ini dengan lengkap dan
          benar.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-start">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormDescription>
                    Nama lengkap ya jangan panggilan.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIM</FormLabel>
                  <FormDescription>NIM kamu yg ada di KTM</FormDescription>
                  <FormControl>
                    <Input placeholder="Masukkan NIM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription>
                    Bebas mau pake email kampus atau pribadi.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_telepon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Telepon</FormLabel>
                  <FormDescription>
                    Format penulisan +62812xxxxx
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nomor telepon"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="LAKI_LAKI" />
                        </FormControl>
                        <FormLabel className="font-normal">Laki-Laki</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PEREMPUAN" />
                        </FormControl>
                        <FormLabel className="font-normal">Perempuan</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormDescription>
                    Alamat tempat tinggal kamu sekarang.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat lengkap"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motivasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivasi</FormLabel>
                  <FormDescription>
                    Apa yang membuat kamu pengen banget join di FOSTI.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Tuliskan motivasi kamu untuk mendaftar di sini"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fakultas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fakultas</FormLabel>
                  <FormDescription>Fakultas kamu saat ini.</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih fakultas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        {
                          value: "FKI",
                          label: "Fakultas Komunikasi dan Informatika",
                        },
                        {
                          value: "FKIP",
                          label: "Fakultas Keguruan dan Ilmu Pendidikan",
                        },
                        { value: "FEB", label: "Fakultas Ekonomi dan Bisnis" },
                        { value: "FH", label: "Fakultas Hukum" },
                        { value: "FT", label: "Fakultas Teknik" },
                        { value: "FF", label: "Fakultas Farmasi" },
                        { value: "FP", label: "Fakultas Psikologi" },
                        { value: "FG", label: "Fakultas Geografi" },
                        { value: "FAI", label: "Fakultas Agama Islam" },
                        { value: "FIK", label: "Fakultas Ilmu Kesehatan" },
                        { value: "FKG", label: "Fakultas Kedokteran Gigi" },
                        { value: "FK", label: "Fakultas Kedokteran" },
                      ].map((fakultas) => (
                        <SelectItem key={fakultas.value} value={fakultas.value}>
                          {fakultas.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prodi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Studi</FormLabel>
                  <FormDescription>
                    Program studi kamu saat ini.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Masukkan program studi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Loading..." : "Daftar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormPendaftaran;
