import axios, { AxiosError } from "axios";
import { env } from "@/env";
import {
  AllRecordsResponse,
  CreateRecordResponse,
  LoginResponse,
} from "@/types/api.response";
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

// export const sendEmail = async (payload: { email: string; nama: string }) => {
//   try {
//     const response = await axios.post(
//       `${env.NEXT_PUBLIC_LOCAL_API}/api/emails`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     return {
//       status: response.status,
//       result: response.data,
//       error: null,
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       result: null,
//       error: "Internal Server Error",
//     };
//   }
// };

export const sendEmail = async (payload: {
  email: string;
  nama: string;
  nim: string;
}) => {
  try {
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: env.NEXT_PUBLIC_SERVICE_ID,
        template_id: env.NEXT_PUBLIC_TEMPLATE_ID,
        user_id: env.NEXT_PUBLIC_USER_ID,
        template_params: {
          nama: payload.nama,
          email: payload.email,
          nim: payload.nim,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
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

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_BASE_API}/api/auth/signin`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {
      status: response.status,
      result: response.data as LoginResponse,
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
    return { status: 500, result: null, error: "Internal Server error" };
  }
};

export const getRecords = async (token: string) => {
  try {
    const response = await axios.get(
      `${env.NEXT_PUBLIC_BASE_API}/api/recruitment`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      status: response.status,
      result: response.data as AllRecordsResponse,
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

export const deleteRecord = async (id: string, token: string) => {
  try {
    const response = await axios.delete(
      `${env.NEXT_PUBLIC_BASE_API}/api/recruitment/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      status: response.status,
      result: response.data.message,
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

export async function downloadExcel(token: string) {
  try {
    const response = await axios.get(
      `${env.NEXT_PUBLIC_BASE_API}/api/excel/export`,
      {
        responseType: "blob", // Important for handling binary data
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Create a link element to trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "DataOprecFOSTI_2025.xlsx"); // Set the file name
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("Failed to download the file. Please try again.");
  }
}
