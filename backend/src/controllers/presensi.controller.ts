import {Router} from "express";
import {presensi} from "../services/presensi.service";

const presensiRouter = Router();

presensiRouter.post('/', presensi)

export default presensiRouter;