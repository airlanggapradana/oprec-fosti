import axios, { AxiosError } from "axios";
import { env } from "@/env";
import {
  AllRecordsResponse,
  CreateRecordResponse,
  LoginResponse,
} from "@/types/api.response";
import { RecruitmentSchema } from "@/zod/validation.schema";
import { UserForm } from "@/components/features/users/components/users-action-dialog";

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

export const sendEmail = async (payload: { email: string; nama: string }) => {
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

export const updateRecord = async (
  id: string,
  payload: UserForm,
  token: string,
) => {
  try {
    const response = await axios.put(
      `${env.NEXT_PUBLIC_BASE_API}/api/recruitment/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      status: response.status,
      result: response.data,
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
