"use client";
import Image from "next/image";

import { useEffect, useRef } from "react";
import { animate, scroll, spring } from "motion";
import { ReactLenis } from "lenis/react";
import example_image from "../../../public/img/main.png";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShinyButton } from "@/components/magicui/shiny-button";
export default function Temp(): JSX.Element {
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll("li");

    if (ulRef.current) {
      const controls = animate(
        ulRef.current,
        {
          // @ts-expect-error - ignore error
          transform: ["none", `translateX(-${items.length - 1}00vw)`],
        },
        { easing: spring() },
      );
      scroll(controls, {
        // @ts-expect-error - ignore error
        target: document.querySelector("#horizontal-scroll"),
      });
    }

    const segmentLength = 1 / items.length;
    items.forEach((item, i) => {
      const header = item.querySelector("h2");

      scroll(animate([header], { x: [800, -800] }), {
        // @ts-expect-error - ignore error
        target: document.querySelector("#horizontal-scroll"),
        offset: [
          [i * segmentLength, 1],
          [(i + 1) * segmentLength, 0],
        ],
      });
    });
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black">
        <div className="wrapper">
          <section className="sticky top-0 grid h-screen w-full place-content-center bg-slate-950 text-white">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="-mt-20 px-8 text-center text-6xl font-semibold leading-[120%] tracking-tight 2xl:text-7xl">
              Join FOSTI UMS Now! 🚀
            </h1>
          </section>

          <section className="sticky top-0 grid h-screen place-content-center overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-gray-300 text-black">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="px-8 text-center text-4xl font-semibold leading-[120%] tracking-tight 2xl:text-7xl">
              Be a part of our tech-savvy community
              <br /> and explore the world of open-source! 💻
            </h1>
          </section>
          <section className="sticky top-0 grid h-screen w-full place-content-center bg-slate-950 text-white">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="px-8 text-center text-5xl font-semibold leading-[120%] tracking-tight 2xl:text-7xl">
              Who We Are 🤔
            </h1>
          </section>
        </div>
        <div className="">
          <section className="sticky top-0 grid h-screen w-full place-content-center bg-slate-950 text-white">
            <div className="grid grid-cols-2">
              <div className="sticky top-0 flex h-screen items-center justify-center">
                <h1 className="px-8 text-center text-3xl font-semibold leading-[120%] tracking-tight 2xl:text-5xl">
                  FOSTI UMS is a student organization under the Faculty of
                  Communication and Informatics at Universitas Muhammadiyah
                  Surakarta. We focus on studying, deepening, and disseminating
                  open-source technologies. Our mission is to foster innovation
                  and collaboration in the tech community.
                </h1>
              </div>
              <div className="grid gap-2">
                <figure className="grid -skew-x-12 place-content-center">
                  <Image
                    src={example_image}
                    alt=""
                    className="h-[30rem] w-[22rem] object-cover align-bottom transition-all duration-300"
                  />
                </figure>
                <figure className="grid skew-x-12 place-content-center">
                  <Image
                    src={example_image}
                    alt=""
                    className="h-[30rem] w-[22rem] object-cover align-bottom transition-all duration-300"
                  />
                </figure>
                <figure className="grid -skew-x-12 place-content-center">
                  <Image
                    src={example_image}
                    alt=""
                    className="h-[30rem] w-[22rem] object-cover align-bottom transition-all duration-300"
                  />
                </figure>
                <figure className="grid skew-x-12 place-content-center">
                  <Image
                    src={example_image}
                    alt=""
                    className="h-[30rem] w-[22rem] object-cover align-bottom transition-all duration-300"
                  />
                </figure>
              </div>
            </div>
          </section>
        </div>
        <section className="w-full bg-slate-950 text-white">
          <div className="grid grid-cols-2 px-8">
            <div className="grid gap-2">
              <figure className="sticky top-0 grid h-screen place-content-center">
                <Card
                  title="Ristek"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  image="https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop"
                  width={550}
                  height={550}
                />
              </figure>
              <figure className="sticky top-0 grid h-screen place-content-center">
                <Card
                  title="Ristek"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  image="https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop"
                  width={590}
                  height={590}
                />
              </figure>
              <figure className="sticky top-0 grid h-screen place-content-center">
                <Card
                  title="Ristek"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  image="https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop"
                  width={630}
                  height={630}
                />
              </figure>
              <figure className="sticky top-0 grid h-screen place-content-center">
                <Card
                  title="Ristek"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  image="https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop"
                  width={670}
                  height={670}
                />
              </figure>
            </div>
            <div className="sticky top-0 grid h-screen place-content-center">
              <h1 className="px-8 text-right text-7xl font-medium leading-[120%] tracking-tight">
                Our Division 😎
              </h1>
            </div>
          </div>
        </section>
        {/* Scroll Horizontal */}

        <section id="horizontal-scroll" className="relative h-[500vh]">
          <ul ref={ulRef} className="sticky top-0 flex w-[500vw]">
            <li className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-950">
              <h2 className="relative bottom-5 inline-block text-center text-[10vw] font-semibold text-white">
                REGISTRATION
                <br />
                TIMELINE
              </h2>
            </li>
            <li className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-950">
              <h2 className="relative bottom-5 inline-block text-[5vw] font-semibold text-white">
                REGISTRATION
                <br />
                March 1 - March 15, 2024
                <br />
                Register by fill form
              </h2>
              <Image
                src={example_image}
                className="absolute bottom-0 w-[380px] 2xl:w-[550px]"
                width={500}
                height={500}
                alt="image"
              />
            </li>
            <li className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-950">
              <h2 className="relative bottom-5 inline-block text-[5vw] font-semibold text-white">
                REVIEWING
                <br />
                March 16 - March 20, 2024
                <br />
                Reviewing by our team
              </h2>
              <Image
                src={example_image}
                className="absolute bottom-0 w-[380px] 2xl:w-[550px]"
                width={500}
                height={500}
                alt="image"
              />
            </li>
            <li className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-950">
              <h2 className="relative bottom-5 inline-block text-[5vw] font-semibold text-white">
                INTERVIEW
                <br />
                March 21 - March 25, 2024
                <br />
                Interview by our team
              </h2>
              <Image
                src={example_image}
                className="absolute bottom-0 w-[380px] 2xl:w-[550px]"
                width={500}
                height={500}
                alt="image"
              />
            </li>
            <li className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-950">
              <h2 className="relative bottom-5 inline-block text-[5vw] font-semibold text-white">
                RESULT
                <br />
                March 26 - March 30, 2024
                <br />
                Result by our team
              </h2>
              <Image
                src={example_image}
                className="absolute bottom-0 w-[380px] 2xl:w-[550px]"
                width={500}
                height={500}
                alt="image"
              />
            </li>
          </ul>
        </section>
        <footer className="group flex h-[100vh] flex-col place-content-center items-center justify-center gap-y-10 bg-slate-950">
          <SparklesText text="Lets Join Us!" />
          <ShinyButton>Get Started</ShinyButton>
        </footer>
      </main>
    </ReactLenis>
  );
}

function Card({
  title,
  description,
  image,
  width,
  height,
}: {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
}) {
  return (
    <>
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className="animate-border mx-auto max-w-[550px] rounded-2xl border border-transparent [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]"
      >
        <div className="relative z-10 mx-auto h-full w-fit rounded-2xl bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/new-grid_ng16tf.png')] px-0 py-16 text-center">
          <>
            <Image
              src={example_image}
              alt="grid"
              width={600}
              className="mx-auto w-[85%]"
              height={600}
            />
            <h1 className="text-xl font-semibold tracking-tight text-white">
              {title}
            </h1>
            <p className="pt-2 text-base capitalize text-gray-300">
              {description}
            </p>
          </>
        </div>
      </div>
    </>
  );
}
