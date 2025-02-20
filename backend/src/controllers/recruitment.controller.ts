import { Router } from "express";
import { createRecruitment } from "../services/recruitment.service";

const router = Router();

router.post("/", createRecruitment);

export default router;
