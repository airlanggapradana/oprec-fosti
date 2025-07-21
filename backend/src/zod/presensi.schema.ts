import {z} from 'zod';

export const masukSchema = z.object({
  id_recruitment: z.string().min(1, 'ID Recruitment is required'),
  waktu_datang: z.string().datetime('Waktu datang harus berupa tanggal dan waktu yang valid').optional(),
  waktu_pulang: z.string().datetime('Waktu pulang harus berupa tanggal dan waktu yang valid').optional(),
  status: z.enum(['HADIR', 'TIDAK_HADIR', 'IZIN'])
})

export type MasukSchema = z.infer<typeof masukSchema>;