"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShinyButton } from "./magicui/shiny-button";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="px-5 py-20 md:px-0">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold text-slate-700 dark:text-white">
          Sudah siap untuk memulainya?
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Mari kita mulai semua pengalaman baru bersama FOSTI UMS!
        </p>
        <ShinyButton onClick={() => router.push("/pendaftaran")}>
          Daftar Sekarang 🚀  
        </ShinyButton>
      </div>
    </section>
  );
};

export default CTA;
