"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { TextAnimate } from "./magicui/text-animate";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShinyButton } from "./magicui/shiny-button";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="container relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center gap-y-10 space-y-8 overflow-hidden px-7 py-24 text-center md:py-32">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="z-10 flex w-full flex-col items-center justify-center gap-y-10">
        <div className="space-y-4">
          <TextAnimate
            once
            duration={2}
            animation="slideUp"
            by="word"
            className="text-2xl font-bold leading-relaxed tracking-tight text-slate-700 dark:text-white sm:text-4xl md:text-6xl md:leading-normal lg:text-7xl"
          >
            Level Up Kreativitasmu Bersama Forum Open Source Teknik Informatika
          </TextAnimate>
          <TextAnimate
            duration={1}
            once
            animation="blurIn"
            by="character"
            className="mx-auto h-full max-w-[54rem] text-xs leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          >
            Gabung bersama kami dengan para mahasiswa yang penuh dengan
            kreativitas dan inovasi. Bersama FOSTI, kamu bisa mengembangkan
            skill dan berbagi wawasan yang kamu miliki.
          </TextAnimate>
        </div>

        <div className="z-10 flex items-center gap-4 px-9 md:px-0">
          <ShinyButton onClick={() => router.push("/pendaftaran")}>
            Gabung Sekarang
          </ShinyButton>

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.replace("#tutorial")}
          >
            Video Tutorial
          </Button>
        </div>
      </div>
      <div className="rounded-[1.7rem] bg-gray-700 bg-opacity-50 p-2 shadow-xl shadow-gray-700/20 md:rounded-[3.4rem] md:p-4">
        <Image
          src="/img/main.png"
          alt="hero"
          width={1800}
          height={2000}
          className="rounded-[1.7rem] md:rounded-[3.4rem]"
        />
      </div>
    </section>
  );
};

export default Hero;
