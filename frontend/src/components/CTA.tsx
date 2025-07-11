"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShinyButton } from "./magicui/shiny-button";
import { Button } from "@/components/ui/button";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="px-5 py-20 md:px-0">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold text-slate-700 dark:text-teal-300">
          Sudah siap untuk memulainya?
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Mari kita mulai semua pengalaman baru bersama FOSTI UMS!
        </p>
        {/*<ShinyButton onClick={() => router.push("/pendaftaran")}>*/}
        {/*  Daftar Sekarang 🚀  */}
        {/*</ShinyButton>*/}
        <Button
          variant={"default"}
          size={"lg"}
          className={
            "from bg-gradient-to-t from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700"
          }
          onClick={() => router.push("/pendaftaran")}
        >
          Daftar Sekarang 🚀
        </Button>
      </div>
    </section>
  );
};

export default CTA;
