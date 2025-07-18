import {Router} from "express";
import {
  createRecruitment,
  deleteRecruitment,
  getAllRecruitment, prosesSeleksi,
  updateRecruitment,
} from "../services/recruitment.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", createRecruitment);
router.get("/", authMiddleware, getAllRecruitment);
router.delete("/:id", authMiddleware, deleteRecruitment);
router.put("/:id", authMiddleware, updateRecruitment);
router.put("/seleksi/:id", authMiddleware, prosesSeleksi);

export default router;
