import React from "react";
import { Users, MonitorCog, ChartNoAxesCombinedIcon } from "lucide-react";
import { CardContent } from "./ui/card";
import { ShineBorder } from "./magicui/shine-border";
import { TypingAnimation } from "./magicui/typing-animation";

const divisi = [
  {
    name: "Keorganisasian",
    description:
      "Divisi yang menjalin hubungan antar anggota dan mempersiapkan calon anggota baru FOSTI UMS.",
    icon: Users,
  },
  {
    name: "Riset dan Teknologi",
    description:
      "Divisi yang melakukan penelitian dan pengembangan teknologi open source untuk FOSTI dan masyarakat.",
    icon: MonitorCog,
  },
  {
    name: "Hubungan Publik",
    description:
      "Divisi yang menjalin hubungan dan kerja sama dengan berbagai pihak untuk memperluas jaringan FOSTI UMS.",
    icon: ChartNoAxesCombinedIcon,
  },
];

const Divisi = () => {
  return (
    <section className="container mx-auto space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <TypingAnimation
          duration={50}
          startOnView
          className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold leading-[1.1] text-transparent dark:bg-gradient-to-t dark:from-slate-300 dark:to-slate-100 sm:text-3xl md:text-5xl"
        >
          Divisi Yang Ada di FOSTI
        </TypingAnimation>
        <p className="mt-4 text-sm text-muted-foreground sm:text-lg">
          Kepoin divisi-divisi keren yang ada di FOSTI yuk!
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-5 md:px-0">
        {divisi.map((tim) => (
          <ShineBorder
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            key={tim.name}
            className="w-full"
            duration={10}
          >
            <CardContent className="flex w-full flex-col gap-2 p-6 md:gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg">
                  <tim.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-base font-bold md:text-lg">{tim.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                {tim.description}
              </p>
            </CardContent>
          </ShineBorder>
        ))}
      </div>
    </section>
  );
};

export default Divisi;
