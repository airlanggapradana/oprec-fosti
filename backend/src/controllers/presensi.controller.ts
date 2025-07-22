import {Router} from "express";
import {getAllPresensi, presensi} from "../services/presensi.service";

const presensiRouter = Router();

presensiRouter.post('/', presensi)
presensiRouter.get('/', getAllPresensi)

export default presensiRouter;