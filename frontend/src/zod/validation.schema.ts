import { z } from "zod";

export const recruitmentSchema = z.object({
  nama: z.string().nonempty("field nama tidak boleh kosong").min(3).max(255),
  nim: z.string().nonempty().min(10).max(10),
  email: z.string().email("email tidak valid").nonempty(),
  no_telepon: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, {
    message: "Nomor telepon tidak valid.",
  }),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"]),
  alamat: z.string().nonempty(),
  motivasi: z.string().nonempty(),
  fakultas: z.enum([
    "FKIP",
    "FEB",
    "FH",
    "FT",
    "FF",
    "FP",
    "FG",
    "FAI",
    "FIK",
    "FK",
    "FKG",
    "FKI",
  ]),
  prodi: z.string().min(3),
});

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>;
