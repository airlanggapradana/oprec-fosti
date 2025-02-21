import React from "react";
import { Button } from "./ui/button";
import DaftarBtn from "./DaftarBtn";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold text-slate-700 dark:text-white">
          Sudah siap untuk memulainya?
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Mari kita mulai semua pengalaman baru bersama FOSTI UMS!
        </p>
        <DaftarBtn text="Daftar Sekarang" size={"lg"} variant={"secondary"} />
      </div>
    </section>
  );
};

export default CTA;
