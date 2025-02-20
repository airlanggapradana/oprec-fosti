import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12 text-white dark:bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="col-span-2 grid">
          <div className="flex flex-col justify-between">
            <Image
              alt="logo"
              src={logo}
              width={128}
              height={128}
              className="dark:invert"
            />
            <p className="text-gray-400">
              Created with ❤️ by RISTEK Web Development Team
            </p>
          </div>
        </div>
        <div className="col-span-2 grid">
          <h4 className="mb-2 text-end text-lg font-semibold text-muted-foreground dark:text-white">
            Connect
          </h4>
          <div className="flex justify-end space-x-4">
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
      <div className="container mx-auto mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} FOSTI UMS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
