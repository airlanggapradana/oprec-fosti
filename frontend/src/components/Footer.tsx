"use client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import logoPutih from "../../public/LOGO FOSTI PUTIH.png";
import { useTheme } from "next-themes";
import React from "react";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="border-t bg-white px-2 py-8 text-white dark:bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-2 py-6 sm:px-4 sm:py-8 md:grid-cols-4">
        <div className="col-span-1 flex flex-col justify-between gap-3 md:col-span-2">
          <div className="flex flex-col items-center justify-between gap-3 md:items-start">
            {theme === "dark" ? (
              <Image
                alt="logo"
                src={logoPutih}
                width={100}
                height={100}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28"
              />
            ) : (
              <Image
                alt="logo"
                src={logo}
                width={100}
                height={100}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28"
              />
            )}
            <p className="text-center text-xs text-gray-400 md:text-left md:text-base">
              Created with ❤️ by RISTEK Web Development Team
            </p>
            <p className="max-w-md text-center text-xs text-gray-400 md:text-left md:text-sm">
              Gedung J Lantai 3 sayap Kanan Fakultas Komunikasi dan Informatika
              Universitas Muhammadiyah Surakarta, Surakarta 57169
            </p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center gap-3 md:col-span-2 md:items-end">
          <h4 className="mb-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 md:text-right md:text-base">
            Connect with Us
          </h4>
          <div className="flex justify-center space-x-4 md:justify-end">
            <Link
              href="https://www.facebook.com/Fosti.Umsurakarta/"
              target="_blank"
              className="text-gray-400 hover:text-teal-300"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="http://instagram.com/fosti_ums"
              target="_blank"
              className="text-gray-400 hover:text-teal-300"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-300">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto border-t border-gray-800 pt-4 text-center text-gray-400 md:mt-8 md:pt-8">
        <p className="text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} FOSTI UMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
