import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import {
  RecruitmentSchema,
  recruitmentSchema,
} from "../zod/recruitment.schema";
import { z, ZodError } from "zod";

export const createRecruitment = async (req: Request, res: Response) => {
  try {
    const records: RecruitmentSchema = recruitmentSchema.parse(req.body);

    const isNIMExist = await prisma.recruitment.findFirst({
      where: {
        OR: [{ nim: records.nim }, { email: records.email }],
      },
    });

    if (isNIMExist) {
      res.status(400).json({ message: "NIM atau Email sudah terdaftar" });
      return;
    }
    const newRecruitment = await prisma.recruitment.create({
      data: records,
    });
    res.status(201).json({
      message: "Data berhasil disimpan",
      data: newRecruitment,
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors[0] });
      return;
    } else {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
};

export const getAllRecruitment = async (req: Request, res: Response) => {
  const { prodi, nama } = req.query;
  try {
    const allRecruitment = await prisma.recruitment.findMany();
    if (nama) {
      const namaLowerCase = (nama as string).toLowerCase();
      const recruitmentByName = await prisma.recruitment.findMany({
        where: {
          nama: {
            contains: namaLowerCase,
            mode: "insensitive",
          },
        },
      });
      if (recruitmentByName.length === 0) {
        res
          .status(404)
          .json({
            message: `Data untuk pencarian ${namaLowerCase} tidak ditemukan`,
          });
        return;
      }
      res.status(200).json({
        message: `Data search ${namaLowerCase} berhasil ditemukan`,
        data: recruitmentByName,
      });
      return;
    }
    if (prodi) {
      const recruitmentByProdi = await prisma.recruitment.findMany({
        where: {
          prodi: {
            equals: prodi as
              | "TEKNIK_INFORMATIKA"
              | "SISTEM_INFORMASI"
              | "ILMU_KOMUNIKASI",
          },
        },
      });
      if (recruitmentByProdi.length === 0) {
        res
          .status(404)
          .json({ message: `Data recruitment untuk ${prodi} tidak ditemukan` });
        return;
      }
      res.status(200).json({
        message: "Data recruitment berhasil ditemukan",
        data: recruitmentByProdi,
      });
      return;
    }
    if (allRecruitment.length === 0) {
      res.status(404).json({ message: "Data recruitment masih kosong" });
      return;
    }
    res.status(200).json({
      message: "Data recruitment berhasil ditemukan",
      data: allRecruitment,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const deleteRecruitment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recruitment = await prisma.recruitment.findUnique({
      where: { id },
    });
    if (!recruitment) {
      res.status(404).json({ message: "Data recruitment tidak ditemukan" });
      return;
    }

    await prisma.recruitment.delete({
      where: { id },
    });
    res.status(200).json({ message: "Data recruitment berhasil dihapus" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const updateRecruitment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const records: RecruitmentSchema = recruitmentSchema.parse(req.body);

    const recruitment = await prisma.recruitment.findUnique({
      where: { id },
    });
    if (!recruitment) {
      res.status(404).json({ message: "Data recruitment tidak ditemukan" });
      return;
    }

    const updatedRec = await prisma.recruitment.update({
      where: { id },
      data: records,
    });
    res.status(200).json({
      message: "Data recruitment berhasil diupdate",
      data: updatedRec,
    });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
