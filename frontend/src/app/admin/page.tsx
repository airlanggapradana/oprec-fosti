"use client";
import React from "react";
import { ArrowRight, Home, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* Main 404 Content */}
        <div className="mb-8">
          <h1 className="select-none text-9xl font-black leading-none text-slate-200 md:text-[12rem]">
            404
          </h1>
          <div className="relative -mt-8 md:-mt-12">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Page Not Found
            </h2>
            <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-600">
              The page you are looking for has been moved to another site due to
              inconvenience user experience.
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative mb-12">
          <div className="mb-6 inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
            <MapPin className="h-16 w-16 text-indigo-500" />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 animate-pulse rounded-full border-2 border-dashed border-slate-300 opacity-50"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => router.push("https://oprec-fosti-admin.vercel.app")}
            size={"lg"}
            className="inline-flex transform items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            <ArrowRight className="h-4 w-4" />
            Go to the new admin page
          </Button>
          <Button
            size={"lg"}
            onClick={() => (window.location.href = "/")}
            className="inline-flex transform items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-200 hover:scale-105 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <Home className="h-4 w-4" />
            Home Page
          </Button>
        </div>

        {/* Additional Help */}
        <div className="rounded-2xl border border-slate-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-slate-800">
            <Search className="h-5 w-5" />
            What can you do?
          </h3>
          <div className="grid gap-4 text-sm sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-1 font-medium text-slate-700">
                Check the URL
              </div>
              <div className="text-slate-500">
                Make sure the address is spelled correctly
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1 font-medium text-slate-700">
                Use Navigation
              </div>
              <div className="text-slate-500">
                Try our main menu or search function
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1 font-medium text-slate-700">
                Contact Support
              </div>
              <div className="text-slate-500">
                We&#39;re here to help if you need assistance
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-slate-400">
          <p>Error Code: 404 • Page Not Found</p>
        </div>
      </div>
    </div>
  );
}
