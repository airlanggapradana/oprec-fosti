import { Router } from "express";
import { exportAsExcel } from "../services/excel.service";

const router = Router();

router.get("/export", exportAsExcel);

export default router;
