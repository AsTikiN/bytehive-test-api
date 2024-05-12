import { Response, NextFunction } from "express";
import { extractPayloadFromToken } from "../lib/tokens";
import { AuthRequest } from "../types/AuthRequest";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Access denied. Token not provided." });
      return;
    }

    const decoded = extractPayloadFromToken(token);
    req.id = decoded.id;

    if (!req.id) {
      res.status(401).json({ message: "Access denied. Incorrect token." });
      return;
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
