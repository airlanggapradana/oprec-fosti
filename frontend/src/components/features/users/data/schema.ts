import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userGenderSchema = z.union([
  z.literal("LAKI_LAKI"),
  z.literal("PEREMPUAN"),
]);

const userSchema = z.object({
  id: z.string(),
  nama: z.string(),
  email: z.string(),
  nim: z.string(),
  no_telepon: z.string(),
  gender: userGenderSchema,
  alamat: z.string(),
  motivasi: z.string(),
  fakultas: z.string(),
  prodi: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);
