import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { TextAnimate } from "./magicui/text-animate";

const Hero = () => {
  return (
    <section className="container mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 px-7 py-24 text-center md:py-32">
      <div className="space-y-4">
        <TextAnimate
          once
          duration={2}
          animation="slideUp"
          by="word"
          className="text-4xl font-bold tracking-tight text-slate-700 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Level Up Kreativitasmu Bersama Forum Open Source Teknik Informatika
        </TextAnimate>
        <TextAnimate
          duration={1}
          once
          animation="blurIn"
          by="character"
          className="mx-auto max-w-[54rem] text-sm leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        >
          Gabung bersama kami dengan para mahasiswa yang penuh dengan
          kreativitas dan inovasi. Bersama FOSTI, kamu bisa mengembangkan skill
          dan berbagi wawasan yang kamu miliki.
        </TextAnimate>
      </div>
      <div className="flex items-center gap-4 px-9 md:px-0">
        <Button size={"lg"}>
          Gabung Sekarang
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          Lihat Video Tutorial
        </Button>
      </div>
    </section>
  );
};

export default Hero;
