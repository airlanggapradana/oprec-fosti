import {Request, Response} from "express";
import prisma from "../../prisma/prisma";
import {MasukSchema, masukSchema} from "../zod/presensi.schema";
import {ZodError} from "zod";

export const presensi = async (req: Request, res: Response) => {
  try {
    const payload: MasukSchema = masukSchema.parse(req.body);
    const createLogMasuk = await prisma.$transaction(async (tx) => {
      const existingLog = await tx.presensi.findFirst({
        where: {
          id_recruitment: payload.id_recruitment
        }
      });

      if (existingLog) {
        res.status(400).json({
          message: 'Anda sudah melakukan presensi'
        })
        return null;
      }

      const existingPendaftar = await tx.recruitment.findUnique({
        where: {id: payload.id_recruitment}
      })
      if (!existingPendaftar) {
        res.status(404).json({
          message: 'Pendaftar tidak ditemukan'
        })
        return null;
      }

      if (payload.status === "IZIN") {
        return tx.presensi.create({
          data: {
            id_recruitment: payload.id_recruitment,
            nama: existingPendaftar.nama,
            waktu_datang: null,
            status: "IZIN"
          }
        });
      }

      if (payload.status === "TIDAK_HADIR") {
        return tx.presensi.create({
          data: {
            id_recruitment: payload.id_recruitment,
            nama: existingPendaftar.nama,
            waktu_datang: null,
            status: "TIDAK_HADIR"
          }
        });
      }


      return tx.presensi.create({
        data: {
          id_recruitment: payload.id_recruitment,
          nama: existingPendaftar.nama,
          waktu_datang: new Date().toISOString(),
          status: "HADIR"
        }
      })
    })
    if (!createLogMasuk) return;
    res.status(201).json({
      message: 'Presensi berhasil ditambahkan',
      data: createLogMasuk
    });
    return
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({
        message: 'Data tidak valid',
        errors: e.issues
      });
      return
    }
    res.status(500).json({
      message: 'Terjadi kesalahan pada server',
      error: e instanceof Error ? e.message : 'Unknown error'
    })
    return
  }
}


