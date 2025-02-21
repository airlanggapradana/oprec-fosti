import axios, { AxiosError } from "axios";
import { env } from "@/env";
import { CreateRecordResponse } from "@/types/api.response";
import { RecruitmentSchema } from "@/zod/validation.schema";

export const createRecord = async (payload: RecruitmentSchema) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_BASE_API}/api/recruitment`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      status: response.status,
      result: response.data as CreateRecordResponse,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status || 500,
        result: null,
        error: error.response?.data.message,
      };
    }
    return { status: 500, result: null, error: "Internal Server Error" };
  }
};
