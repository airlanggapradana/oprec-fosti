"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface DaftarBtnProps {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  text: string;
}

const DaftarBtn = ({ size, variant, text }: DaftarBtnProps) => {
  const router = useRouter();
  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => router.push("/pendaftaran")}
    >
      {text}
    </Button>
  );
};

export default DaftarBtn;
