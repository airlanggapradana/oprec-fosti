import { Router } from "express";
import { signIn } from "../services/auth.service";

const router = Router();

router.post("/signin", signIn);

export default router;
