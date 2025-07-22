import {Router} from "express";
import {exportAsExcel} from "../services/excel.service";

const router = Router();

router.get("/export/:exportType", exportAsExcel);

export default router;
