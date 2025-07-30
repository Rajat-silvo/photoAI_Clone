import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  try {
    const decoded = jwt.decode(token, process.env.AUTH_JWT_KEY, {
      algorithms: ["RS256"],
    });

    if (decoded?.sub) {
      req.userId = decoded?.sub; // Attach user ID to request object, this will give error if types.d.ts is not created
      next();
    } else {
      res.status(403).json({ message: "Error while decoding JWT" });
    }
  } catch (e) {
    res.status(403).json({ message: "Error while decoding JWT" });
  }
}
