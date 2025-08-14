import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { env } from "@/env";
import { CheckRecruitmentStatusResponse } from "@/types/checkRecruitmentStatus.type";

export const useCheckRegistration = () => {
  return useMutation({
    mutationFn: async (nim: string) => {
      try {
        const res = await axios
          .get(`${env.NEXT_PUBLIC_BASE_API}/api/recruitment/${nim}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          })
          .then((response) => response.data as CheckRecruitmentStatusResponse);
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            e.response?.data.message ||
              "Terjadi kesalahan saat memeriksa pendaftaran.",
          );
        }
        throw new Error("Terjadi kesalahan saat memeriksa pendaftaran.");
      }
    },
  });
};
