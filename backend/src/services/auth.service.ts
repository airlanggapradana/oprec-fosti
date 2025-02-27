import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthSchema, authSchema } from "../zod/auth.schema";
import { z } from "zod";
import env from "../env";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password }: AuthSchema = authSchema.parse(req.body);

    // Check if username and password is correct
    if (username === env.USERNAME && password === env.PASSWORD) {
      const token = jwt.sign(
        {
          id: crypto.randomUUID(),
          username,
        },
        env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        message: "Success",
        token,
      });
      return;
    }
    res.status(400).json({
      message: "Invalid username or password",
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
      return;
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};
