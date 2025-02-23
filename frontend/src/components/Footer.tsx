import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12 text-white dark:bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4 md:py-12">
        <div className="col-span-1 grid md:col-span-2">
          <div className="flex flex-col justify-between gap-3">
            <Image
              alt="logo"
              src={logo}
              width={100}
              height={100}
              className="dark:invert"
            />
            <p className="text-sm text-gray-400 md:text-base">
              Created with ❤️ by RISTEK Web Development Team
            </p>
          </div>
        </div>
        <div className="col-span-1 grid md:col-span-2">
          <h4 className="mb-3 text-start text-lg font-semibold text-muted-foreground dark:text-white md:text-end">
            Connect
          </h4>
          <div className="flex justify-start space-x-4 md:justify-end">
            <Link
              href="https://www.facebook.com/Fosti.Umsurakarta/"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="http://instagram.com/fosti_ums"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 border-t border-gray-800 pt-4 text-center text-gray-400 md:mt-8 md:pt-8">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} FOSTI UMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
