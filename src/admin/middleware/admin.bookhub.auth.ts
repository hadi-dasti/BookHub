import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from '../model/admin.bookhub.schema';
import { JWT_SECRET_ADMIN } from "../../config/config";
import { IAdmin } from "../model/admin.bookhub.interface";

interface DecodedToken {
  adminId: string;
}

// Middleware function for admin authorization
export const AdminAuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({
          success: false,
          msg: "Authorization token is missing",
        });
      }
      // Verify and decode the token
      const decoded: DecodedToken = jwt.verify(
        token,
        JWT_SECRET_ADMIN!
      ) as DecodedToken;

      // Find admin based on decoded admin ID
      const admin: IAdmin | null = await Admin.findById(decoded.adminId);

      if (!admin) {
        return res.status(401).json({
          sucess: false,
          msg: "Admin not found",
        });
        }
        
      // Check if admin has admin rule
      if (admin.rule !== "admin") {
        return res.status(403).json({
          sucess: false,
          message: "Unauthorized access",
        });
      }

      return next();
    } catch (err) {
        return res.status(401).json({
          sucess: false,
          msg: "Invalid token",
        });
    }
}