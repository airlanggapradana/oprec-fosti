import express, { Application, Request, Response } from "express";
import cors from "cors";
import env from "./env";
import recruitment from "./controllers/recruitment.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Selamat Datang di API Oprec Fosti");
});

app.use("/api/recruitment", recruitment);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
