import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegistrationSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-900">
      <Card className="w-full max-w-md text-center dark:border-gray-700">
        <CardHeader>
          <div className="mx-auto mb-4 w-32">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary dark:text-primary"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
          </div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Pendaftaran Berhasil!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-300">
            Selamat! kamu udah berhasil mendaftar. Sekarang cek email kamu ya!
          </p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground dark:text-gray-400">
            <p>• Cek email kamu</p>
            <p>• Tunggu pengumumannya</p>
            <p>
              • Kalo masih ada yang bingung, kontak kita lewat nomor yang
              tertera yak!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="mt-4">
            <Link href="/">Kembali ke Halaman Awal</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
