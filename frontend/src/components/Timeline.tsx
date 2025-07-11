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
    gradient: "from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-300",
    isLeft: true,
  },
  {
    icon: <FileCheck className="h-6 w-6 text-white" />,
    title: "Review Berkas Pendaftaran",
    date: "March 16 - March 31, 2024",
    description: "Kita akan meninjau berkas pendaftaranmu",
    gradient: "from-teal-500 to-teal-600 dark:from-teal-500 dark:to-teal-300",
    isLeft: false,
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Interviews",
    date: "April 1 - April 15, 2024",
    description: "Kandidat yang lolos akan dihubungi untuk interview",
    gradient: "from-teal-500 to-teal-600 dark:from-teal-500 dark:to-teal-300",
    isLeft: true,
  },
  {
    icon: <Trophy className="h-6 w-6 text-white" />,
    title: "Seleksi Akhir",
    date: "April 20, 2024",
    description: "Pengumuman anggota baru",
    gradient: "from-teal-600 to-teal-500 dark:from-teal-500 dark:to-teal-300",
    isLeft: false,
  },
];

const Timeline = () => {
  return (
    <section id="faq" className="container mx-auto space-y-16 py-24 md:py-32">
      <h2 className="mb-12 bg-gradient-to-b from-teal-500 to-teal-600 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent dark:bg-gradient-to-t dark:from-teal-300 dark:to-teal-100 sm:text-4xl md:text-5xl">
        Recruitment Timeline
      </h2>
      <div className="mx-auto max-w-3xl px-5 md:px-0">
        <div className="relative px-5">
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-teal-400 to-teal-600 dark:bg-gradient-to-b dark:from-teal-300 dark:to-teal-100"></div>
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
      className={`relative flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"} mb-8 items-start md:items-center`}
    >
      <div
        className={`absolute left-0 top-0 -ml-6 h-12 w-12 rounded-full bg-gradient-to-br md:left-1/2 md:ml-0 ${gradient} z-10 flex items-center justify-center shadow-lg transition-all duration-500 ${isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"} transform md:-translate-x-1/2`}
      >
        {icon}
      </div>
      <Card
        className={`ml-12 w-[90%] md:ml-0 md:w-5/12 ${isLeft ? "md:mr-8" : "md:ml-8"} bg-white/80 backdrop-blur-md hover:shadow-lg dark:bg-gray-800/80 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <CardHeader>
          <CardTitle className="text-teal-700 dark:text-teal-400">
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
