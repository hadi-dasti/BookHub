import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../model/schema/user.bookhub.schema";
import { JWT_SECRET } from "../../config/config";


// Extend the Express namespace to add user property to Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const VerifyAccessTokenUser = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    // Get the Authorization header and remove the "Bearer " prefix
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        msg: "Access token is missing",
      });
    }

    // Verify access token
    const decodedToken = jwt.verify(accessToken, JWT_SECRET as Secret) as {
      id: string;
    };

    // Check if user exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    // Attach user object to request for further use in controllers
    req.user = user;
     next();

  } catch (err) {

    console.error(err);
    return res.status(403).json({
      success: false,
      msg: "Access token is invalid",
    });
  }
};




