import {Request, Response} from "express";
import prisma from "../../prisma/prisma";
import {RecruitmentSchema, recruitmentSchema,} from "../zod/recruitment.schema";
import {z, ZodError} from "zod";

export const createRecruitment = async (req: Request, res: Response) => {
  try {
    const records: RecruitmentSchema = recruitmentSchema.parse(req.body);

    const isNIMExist = await prisma.recruitment.findFirst({
      where: {
        OR: [{nim: records.nim}, {email: records.email}],
      },
    });

    if (isNIMExist) {
      res.status(400).json({message: "NIM atau Email sudah terdaftar"});
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
        .json({message: "Validation failed", errors: error.errors});
      return;
    } else {
      res.status(500).json({message: "Internal server error"});
      return;
    }
  }
};

export const getAllRecruitment = async (req: Request, res: Response) => {
  const {limit, page} = req.query;
  try {
    if (limit && isNaN(Number(limit))) {
      res.status(400).json({message: "Limit harus berupa angka"});
      return;
    }
    let allRecruitment = await prisma.recruitment.findMany({
      orderBy: {createdAt: "desc"},
      include: {
        presensi: true
      }
    });
    if (limit && page) {
      allRecruitment = await prisma.recruitment.findMany({
        take: limit ? parseInt(limit as string) : 10,
        skip: page ? (parseInt(page as string) - 1) * (limit ? parseInt(limit as string) : 10) : 0,
        orderBy: {createdAt: "desc"},
        include: {
          presensi: true
        }
      });
    }
    if (allRecruitment.length === 0) {
      res.status(200).json({message: "Data recruitment masih kosong", data: []});
      return;
    }
    res.status(200).json({
      message: "Data recruitment berhasil ditemukan",
      data: allRecruitment,
      total: allRecruitment.length,
      page: parseInt(page as string)
    });
    return;
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    return;
  }
};

export const getRecruitmentByNIM = async (req: Request, res: Response) => {
  try {
    const {nim} = req.params;
    const recruitment = await prisma.recruitment.findFirst({
      where: {nim}
    })
    if (!recruitment) {
      res.status(200).send({
        message: "Data recruitment tidak ditemukan",
        data: null
      })
      return
    }
    res.status(200).json({
      message: "Data recruitment berhasil ditemukan",
      data: recruitment,
    });
    return
  } catch (e) {
    res.status(500).send({
      message: "Internal server error",
      error: e instanceof Error ? e.message : "Unknown error",
    })
    return
  }
}

export const deleteRecruitment = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const recruitment = await prisma.recruitment.findUnique({
      where: {id},
    });
    if (!recruitment) {
      res.status(404).json({message: "Data recruitment tidak ditemukan"});
      return;
    }

    await prisma.recruitment.delete({
      where: {id},
    });
    res.status(200).json({message: "Data recruitment berhasil dihapus"});
    return;
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    return;
  }
};

export const updateRecruitment = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const records: Partial<RecruitmentSchema> = recruitmentSchema.partial().parse(req.body);

    const recruitment = await prisma.recruitment.findUnique({
      where: {id},
    });
    if (!recruitment) {
      res.status(404).json({message: "Data recruitment tidak ditemukan"});
      return;
    }

    const updatedRec = await prisma.recruitment.update({
      where: {id},
      data: records,
    });
    res
      .status(200)
      .json({
        message: "Data recruitment berhasil diupdate",
        data: updatedRec,
      });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({message: "Validation failed", errors: error.errors});
      return;
    }
    res.status(500).json({message: "Internal server error"});
    return;
  }
};

export const prosesSeleksi = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const payload = recruitmentSchema.pick({status: true}).parse(req.body);
    const seleksi = await prisma.$transaction(async (tx) => {
      const recruitment = await tx.recruitment.findUnique({
        where: {id},
      })
      if (!recruitment) {
        res.status(404).json({
          message: "Data recruitment tidak ditemukan",
        })
        return null;
      }
      // update status di database
      return tx.recruitment.update({
        where: {id},
        data: {
          status: payload.status,
        }
      })
    })
    if (!seleksi) return;
    res.status(200).json({
      message: "Data seleksi berhasil dibuat",
      data: seleksi,
    });
    return
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: e.errors,
      });
      return;
    }
    res.status(500).json({
      message: "Internal server error",
      error: e instanceof Error ? e.message : "Unknown error",
    });
    return;
  }
}
