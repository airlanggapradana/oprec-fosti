import LoginForm from "@/components/LoginForm";
import React from "react";

export default function AdminPage() {
  return (
    <div className="relative z-30">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full">
          <div className="container mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
