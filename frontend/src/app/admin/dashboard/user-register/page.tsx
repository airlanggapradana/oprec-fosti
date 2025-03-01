import Users from "@/components/features/users";
import { getRecords } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const metadata = {
  title: "User Register",
  description: "User Register",
};

async function UserRegister() {
  const token = await getCookie("token");
  return (
    <div className="rleative z-30">
      <Users token={token as string} />
    </div>
  );
}

export default UserRegister;
