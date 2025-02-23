import React from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { TypingAnimation as Typing } from "./magicui/typing-animation";
import HeroVideoDialog from "./magicui/hero-video-dialog";

const SubmissionFlow = () => {
  return (
    <section
      id="tutorial"
      className="container mx-auto space-y-16 py-24 md:py-32"
    >
      <h1 className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent dark:bg-gradient-to-t dark:from-slate-300 dark:to-slate-100 sm:text-4xl md:text-5xl">
        Tata Cara Pendaftaran
      </h1>
      <div className="mx-auto max-w-6xl px-5 md:px-0">
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:gap-9">
          <TerminalCard />
          <Typing
            as={"p"}
            startOnView
            duration={20}
            className="text-center text-lg font-medium leading-relaxed tracking-tight text-muted-foreground md:text-start"
          >
            Merupakan tata cara pendaftaran yang dapat kamu lakukan jika
            tertarik bergabung dengan FOSTI. Jika kamu mengalami kesulitan,
            jangan ragu untuk menghubungi kami melalui kontak yang tersedia yaa
            ❤️.
          </Typing>
        </div>

        <div className="relative mt-16">
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/Mh4lx5Yl3bs?si=WwUhdpvlT8jRCr4h"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/Mh4lx5Yl3bs?si=WwUhdpvlT8jRCr4h"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </section>
  );
};

function TerminalCard() {
  return (
    <Terminal>
      <TypingAnimation duration={70}>
        &gt; Siapin dulu identitas penting kamu seperti KTM dan KTP.
      </TypingAnimation>

      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ Scroll down ke halaman paling bawah dari web ini.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Klik tombol Daftar Sekarang.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="text-green-500">
        <span>
          ✔ Silakan isi seluruh field dari form yang ada pada tampilan.
        </span>
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="text-green-500">
        <span>
          ✔ Selamat kamu telah mendaftar menjadi{" "}
          <span className="font-semibold">KANDIDAT</span> anggota fosti.
        </span>
      </AnimatedSpan>

      <AnimatedSpan delay={6000} className="text-blue-500">
        <span>ℹ INFORMASI PENTING:</span>
        <span className="pl-2">
          - NIM DAN EMAIL YANG TELAH TERDAFTAR TIDAK DAPAT MENDAFTAR UNTUK KEDUA
          KALINYA. <br />- SETELAH BERHASIL MENDAFTAR, SILAKAN CEK EMAIL KALIAN.
        </span>
      </AnimatedSpan>
    </Terminal>
  );
}

export default SubmissionFlow;
