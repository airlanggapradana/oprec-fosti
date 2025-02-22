import { Resend } from "resend";
import { env } from "@/env";
import Welcome from "@/emails/Welcome";

const resend = new Resend(env.NEXT_PUBLIC_RESEND_KEY);

export async function POST(req: Request) {
  const payload: { email: string; nama: string } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "fostiums.org",
      to: payload.email,
      subject: "Yeayy! Selamat kamu udah berhasil daftar di Fosti!",
      react: Welcome({ nama: payload.nama, email: payload.email }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
