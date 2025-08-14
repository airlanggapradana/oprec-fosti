"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Search, XCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  checkRegistrationSchema,
  CheckRegistrationSchema,
} from "@/zod/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckRegistration } from "@/utils/query";
import { Recruitment } from "@/types/checkRecruitmentStatus.type";

const CheckPendaftaranPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [candidateResult, setCandidateResult] = useState<Recruitment | null>(
    null,
  );
  const form = useForm<CheckRegistrationSchema>({
    defaultValues: {
      nim: "",
    },
    resolver: zodResolver(checkRegistrationSchema),
  });

  const { mutateAsync: handleCheckRegistration, isPending } =
    useCheckRegistration();

  const onSubmit: SubmitHandler<CheckRegistrationSchema> = async (data) => {
    try {
      const res = await handleCheckRegistration(data.nim);
      setCandidateResult(res);
      setIsDialogOpen(true);
    } catch (e) {
      form.setError("root", {
        type: "manual",
        message: e instanceof Error ? e.message : "Terjadi kesalahan",
      });
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Cek Status Penerimaan
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Masukkan NIM Anda untuk mengecek status penerimaan di FOSTI UMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          {form.formState.errors.root && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
              <p className="font-semibold">Error:</p>
              <p>{form.formState.errors.root.message}</p>
            </div>
          )}
          <Form {...form}>
            <form className={"space-y-5"}>
              <FormField
                name="nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan NIM Anda"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage />
              <Button
                type="submit"
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
              >
                <Search className="mr-2 h-4 w-4" />
                Cek Status
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {candidateResult?.status === "ACCEPTED" ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : candidateResult?.status === "REJECTED" ? (
                <XCircle className="h-6 w-6 text-red-500" />
              ) : (
                <XCircle className="h-6 w-6 text-gray-500" />
              )}
              Hasil Pengecekan
            </DialogTitle>
          </DialogHeader>

          {!candidateResult ? (
            <div className="py-4 text-center">
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                NIM{" "}
                <span className="font-semibold">{form.getValues("nim")}</span>{" "}
                tidak ditemukan. Silakan periksa kembali nim Anda.
              </DialogDescription>
            </div>
          ) : candidateResult ? (
            <div className="space-y-3 py-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {candidateResult.nama}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  NIM: {candidateResult.nim}
                </p>
              </div>

              {candidateResult.status === "ACCEPTED" ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    🎉 Selamat! Anda DITERIMA
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Silakan tunggu informasi lebih lanjut melalui email atau
                    telepon dari tim HR kami.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                  <p className="font-semibold text-red-800 dark:text-red-200">
                    Maaf, Anda BELUM DITERIMA
                  </p>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                    Terima kasih atas minat Anda. Jangan menyerah dan terus
                    tingkatkan kemampuan Anda!
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <div className="mt-4 flex justify-center">
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckPendaftaranPage;
