"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteCookie } from "@/utils/cookies";

const LogoutBtn = () => {
  return (
    <Button variant={"destructive"} onClick={() => deleteCookie("token")}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
