import { Router } from "express";
import {
  createRecruitment,
  deleteRecruitment,
  getAllRecruitment,
} from "../services/recruitment.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", createRecruitment);
router.get("/", authMiddleware, getAllRecruitment);
router.delete("/:id", authMiddleware, deleteRecruitment);

export default router;
