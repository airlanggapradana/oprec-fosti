"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CalendarDays, FileCheck, Trophy, Users } from "lucide-react";

const timelines = [
  {
    icon: <CalendarDays className="h-6 w-6 text-white" />,
    title: "Periode Pendaftaran",
    date: "March 1 - March 15, 2024",
    description: "Kirim pendaftaranmu sekarang juga",
    gradient:
      "from-purple-400 to-purple-600 dark:from-slate-500 dark:to-slate-300",
    isLeft: true,
  },
  {
    icon: <FileCheck className="h-6 w-6 text-white" />,
    title: "Review Berkas Pendaftaran",
    date: "March 16 - March 31, 2024",
    description: "Kita akan meninjau berkas pendaftaranmu",
    gradient:
      "from-purple-500 to-pink-500 dark:from-slate-500 dark:to-slate-300",
    isLeft: false,
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Interviews",
    date: "April 1 - April 15, 2024",
    description: "Kandidat yang lolos akan dihubungi untuk interview",
    gradient: "from-pink-500 to-pink-600 dark:from-slate-500 dark:to-slate-300",
    isLeft: true,
  },
  {
    icon: <Trophy className="h-6 w-6 text-white" />,
    title: "Seleksi Akhir",
    date: "April 20, 2024",
    description: "Pengumuman anggota baru",
    gradient:
      "from-pink-600 to-purple-600 dark:from-slate-500 dark:to-slate-300",
    isLeft: false,
  },
];

const Timeline = () => {
  return (
    <section id="faq" className="container mx-auto space-y-16 py-24 md:py-32">
      <h2 className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent dark:bg-gradient-to-t dark:from-slate-300 dark:to-slate-100 sm:text-4xl md:text-5xl">
        Recruitment Timeline
      </h2>
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-purple-400 to-pink-400 dark:bg-gradient-to-b dark:from-slate-300 dark:to-slate-100"></div>
          <div className="space-y-12">
            {timelines.map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function TimelineItem({
  icon,
  title,
  date,
  description,
  gradient,
  isLeft,
}: {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: string;
  gradient: string;
  isLeft: boolean;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const itemRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex ${isLeft ? "justify-start" : "justify-end"} items-center`}
    >
      <div
        className={`absolute left-1/2 h-12 w-12 -translate-x-1/2 transform rounded-full bg-gradient-to-br ${gradient} z-10 flex items-center justify-center shadow-lg transition-all duration-500 ${isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        {icon}
      </div>
      <Card
        className={`w-5/12 ${isLeft ? "mr-8" : "ml-8"} bg-white/80 backdrop-blur-md transition-all duration-500 hover:shadow-lg dark:bg-gray-800/80 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-400">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            {date}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Timeline;
