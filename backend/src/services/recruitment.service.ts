import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import {
  RecruitmentSchema,
  recruitmentSchema,
} from "../zod/recruitment.schema";
import { z } from "zod";

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
