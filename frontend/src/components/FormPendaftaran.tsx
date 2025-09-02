"use client";
import React, { useEffect, useState } from "react";
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

// Atur tanggal mulai & berakhir
const startDate = new Date("2025-09-03T00:00:00+07:00"); // tanggal mulai
const endDate = new Date("2025-09-11T23:59:59+07:00"); // tanggal berakhir

const FormPendaftaran = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<RecruitmentSchema>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      nama: "",
      nim: "",
      email: "",
      link_twibbon: "",
      link_video: "",
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

  useEffect(() => {
    const checkDisabled = () => {
      const now = new Date(); // ambil ulang setiap kali
      setIsDisabled(now >= startDate && now <= endDate);
    };
    checkDisabled();
    const interval = setInterval(checkDisabled, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, []);

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
        {isDisabled && (
          <div className="mb-4 rounded-md bg-red-100 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Pendaftaran Ditutup
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  Sorry yee! 😅, pendaftarannya udah ditutup nihh. Makasih
                  banget yang udah daftar 🙏! Kita tunggu di grand opening yaa!
                  🎉
                </div>
              </div>
            </div>
          </div>
        )}
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
                    <Input
                      placeholder="Masukkan nama lengkap"
                      {...field}
                      disabled={isDisabled}
                    />
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
                    <Input
                      placeholder="Masukkan NIM"
                      {...field}
                      disabled={isDisabled}
                    />
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link_twibbon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Twibbon</FormLabel>
                  <FormDescription>
                    Masukin link twibbon kamu disini.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder={"e.g link post ig"}
                      {...field}
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link_video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Video</FormLabel>
                  <FormDescription>
                    Masukin link video kamu disini.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder={"e.g link vt tiktok"}
                      {...field}
                      disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    <Input
                      placeholder="Masukkan program studi"
                      {...field}
                      disabled={isDisabled}
                    />
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
          disabled={form.formState.isSubmitting || isDisabled}
        >
          {form.formState.isSubmitting ? "Loading..." : "Daftar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormPendaftaran;
