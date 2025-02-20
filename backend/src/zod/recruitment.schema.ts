import { z } from "zod";

export const recruitmentSchema = z.object({
  nama: z.string().nonempty("field nama tidak boleh kosong").min(3).max(255),
  nim: z.string().nonempty().min(10).max(10),
  email: z.string().email("email tidak valid").nonempty(),
  no_telepon: z.string().nonempty().min(10).max(15),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"]),
  alamat: z.string().nonempty(),
  motivasi: z.string().nonempty(),
  fakultas: z
    .string()
    .nonempty()
    .default("FAKULTAS KOMUNIKASI DAN INFORMATIKA"),
  prodi: z.enum(["SISTEM_INFORMASI", "TEKNIK_INFORMATIKA", "ILMU_KOMUNIKASI"]),
});

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>;
