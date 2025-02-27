import { Router } from "express";
import {
  createRecruitment,
  deleteRecruitment,
  getAllRecruitment,
  updateRecruitment,
} from "../services/recruitment.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", createRecruitment);
router.get("/", authMiddleware, getAllRecruitment);
router.delete("/:id", authMiddleware, deleteRecruitment);
router.put("/:id", authMiddleware, updateRecruitment);

export default router;
