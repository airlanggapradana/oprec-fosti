import { Request, Response, NextFunction } from "express";

interface JWTPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

interface ValidationResult {
  valid: boolean;
  payload?: JWTPayload;
  error?: string;
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const [prefix, base64] = token.split(" ");

  if (prefix !== "Bearer") {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const isValid = validateTokenExpiration(base64);
    if (isValid.valid) {
      req.body.user = isValid.payload;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}

/**
 * Validates only the expiration of a JWT token without checking the signature
 * @param token JWT token to validate
 * @returns ValidationResult indicating if the token is expired and the decoded payload
 */
export function validateTokenExpiration(token: string): ValidationResult {
  try {
    // Get the payload part of the token (second part)
    const [, payloadBase64] = token.split(".");

    if (!payloadBase64) {
      return {
        valid: false,
        error: "Invalid token format",
      };
    }

    // Decode the payload
    const payload: JWTPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString()
    );

    // Check if token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTimestamp) {
      return {
        valid: false,
        payload,
        error: "Token has expired",
      };
    }

    return {
      valid: true,
      payload,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Failed to decode token",
    };
  }
}
