import { Router } from "express";
import {
  createRecruitment,
  getAllRecruitment,
} from "../services/recruitment.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", createRecruitment);
router.get("/", authMiddleware, getAllRecruitment);

export default router;
