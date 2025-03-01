import express, { Application, Request, Response } from "express";
import cors from "cors";
import env from "./env";
import recruitment from "./controllers/recruitment.controller";
import auth from "./controllers/auth.controller";
import excel from "./controllers/excel.controller";
import authMiddleware from "./middleware/auth.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Selamat Datang di API Oprec Fosti");
});

app.use("/api/auth", auth);
app.use("/api/recruitment", recruitment);
app.use("/api/excel", authMiddleware, excel);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
