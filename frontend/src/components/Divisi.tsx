import React from "react";
import { CardContent } from "./ui/card";
import { ShineBorder } from "./magicui/shine-border";
import { TypingAnimation } from "./magicui/typing-animation";
import { CanvasReveal } from "@/components/CanvasReveal";

const Divisi = () => {
  return (
    <section className="container mx-auto space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <TypingAnimation
          duration={50}
          startOnView
          className="bg-gradient-to-b from-teal-500 to-teal-600 bg-clip-text text-3xl font-bold leading-[1.1] text-transparent dark:bg-gradient-to-t dark:from-teal-300 dark:to-teal-100 sm:text-3xl md:text-5xl"
        >
          Divisi Yang Ada di FOSTI
        </TypingAnimation>
        <p className="mt-4 text-sm text-muted-foreground sm:text-lg">
          Kepoin divisi-divisi keren yang ada di FOSTI yuk!
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-5 md:px-0">
        <CanvasReveal />
      </div>
    </section>
  );
};

export default Divisi;
