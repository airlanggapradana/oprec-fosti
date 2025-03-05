import { z } from "zod";

const FileSchema = z.custom<File>((val) => val instanceof File, {
  message: "Please upload a file",
});

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
  fakultas: z
    .string()
    .nonempty()
    .default("FAKULTAS KOMUNIKASI DAN INFORMATIKA"),
  prodi: z.enum(["SISTEM_INFORMASI", "TEKNIK_INFORMATIKA", "ILMU_KOMUNIKASI"]),
  foto: FileSchema.nullable().optional(),
});

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>;
