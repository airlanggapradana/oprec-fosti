"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { ChartNoAxesCombinedIcon, MonitorCog, Users } from "lucide-react";

const divisi = [
  {
    name: "Keorganisasian",
    description:
      "Divisi yang menjalin hubungan antar anggota dan mempersiapkan calon anggota baru FOSTI UMS.",
    icon: <Users className="h-14 w-14" />,
    color: "bg-indigo-600",
  },
  {
    name: "Riset dan Teknologi",
    description:
      "Divisi yang melakukan penelitian dan pengembangan teknologi open source untuk FOSTI dan masyarakat.",
    icon: <MonitorCog className="h-14 w-14" />,
    color: "bg-emerald-600",
  },
  {
    name: "Hubungan Publik",
    description:
      "Divisi yang menjalin hubungan dan kerja sama dengan berbagai pihak untuk memperluas jaringan FOSTI UMS.",
    icon: <ChartNoAxesCombinedIcon className="h-14 w-14" />,
    color: "bg-blue-600",
  },
];

export function CanvasReveal() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-12 px-8 py-20 dark:bg-black lg:flex-row">
      {divisi.map((d) => (
        <Card
          key={d.name}
          title={d.name}
          icon={d.icon}
          description={d.description}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName={d.color}
            colors={[[125, 211, 252]]}
            dotSize={2}
          />
        </Card>
      ))}
    </div>
  );
}

const Card = ({
  title,
  icon,
  description,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex h-[30rem] w-full max-w-sm flex-col items-center justify-center border border-black/[0.2] p-4 dark:border-white/[0.2]"
    >
      <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center">
        <div className="mx-auto flex w-full items-center justify-center text-center transition duration-200 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0">
          {icon}
        </div>
        <h2 className="relative z-10 mt-4 text-xl font-bold text-black opacity-0 transition duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-white/80 opacity-0 transition duration-200 group-hover/canvas-card:opacity-100">
          {description}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = () => (
  <svg
    width="66"
    height="65"
    viewBox="0 0 66 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-black group-hover/canvas-card:text-white dark:text-white"
  >
    <path
      d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
      stroke="currentColor"
      strokeWidth="15"
      strokeMiterlimit="3.86874"
      strokeLinecap="round"
      style={{ mixBlendMode: "darken" }}
    />
  </svg>
);

export const Icon = ({ className, ...rest }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
    {...rest}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);
