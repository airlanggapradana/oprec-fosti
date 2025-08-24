"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CountdownPage() {
  const router = useRouter();
  // Set your event date here - currently set to New Year 2025
  const eventDate = new Date("2025-08-25T00:00:00");
  const eventName = "Oprec Fosti 2025 Registration Opens!";
  const eventDescription = "Welcome to the most anticipated event of the year!";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventDay, setIsEventDay] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const eventTime = eventDate.getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
        setIsEventDay(false);
      } else {
        setIsEventDay(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (isEventDay) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Sparkles className="h-16 w-16 animate-pulse text-yellow-400" />
            </div>
            <h1 className="mb-4 animate-bounce text-6xl font-bold text-white md:text-8xl">
              🎉
            </h1>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              It&#39;s Here!
            </h2>
            <p className="mb-8 text-xl text-blue-200 md:text-2xl">
              {eventName}
            </p>
          </div>

          <Card className="border-white/20 bg-white/10 backdrop-blur-md">
            <CardContent className="p-8">
              <p className="mb-6 text-lg text-white/90">{eventDescription}</p>
              <p className="mb-6 text-white/80">
                The wait is over! Welcome to this special day we&#39;ve all been
                counting down to.
              </p>
              <Button
                size="lg"
                className="bg-yellow-500 font-semibold text-black hover:bg-yellow-600"
                onClick={() => router.push("/")}
              >
                <Star className="mr-2 h-5 w-5" />
                Register Now!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            Coming Soon
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            {eventName}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300">
            {eventDescription}
          </p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
              <Clock className="h-6 w-6" />
              Countdown Timer
            </CardTitle>
            <CardDescription className="text-slate-300">
              Time remaining until the big day
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              <div className="text-center">
                <div className="mb-2 rounded-lg bg-white/10 p-4">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    {timeLeft.days}
                  </div>
                </div>
                <div className="text-sm uppercase tracking-wide text-slate-400">
                  Days
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 rounded-lg bg-white/10 p-4">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    {timeLeft.hours}
                  </div>
                </div>
                <div className="text-sm uppercase tracking-wide text-slate-400">
                  Hours
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 rounded-lg bg-white/10 p-4">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    {timeLeft.minutes}
                  </div>
                </div>
                <div className="text-sm uppercase tracking-wide text-slate-400">
                  Minutes
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 rounded-lg bg-white/10 p-4">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    {timeLeft.seconds}
                  </div>
                </div>
                <div className="text-sm uppercase tracking-wide text-slate-400">
                  Seconds
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-slate-400">
          Event Date: {eventDate.toLocaleDateString()} at{" "}
          {eventDate.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
