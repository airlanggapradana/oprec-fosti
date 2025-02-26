"use server";
import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie ? cookie.value : undefined;
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}
