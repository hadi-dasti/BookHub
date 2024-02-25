import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../model/schema/user.bookhub.schema";
import { IUser } from "../model/interface/user.bookhub.interface";
import {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
} from "../../config/config";



export class UserRefreshTokenController {
  
    public async userRefreshToken(req:Request,res:Response): Promise<Response>{
        try {
          const { userId, refreshToken } = req.body;

          // Check if user with the provided ID exists
          const user: IUser = await User.findById(userId);
          if (!user) {
            return res.status(404).json({
              success: false,
              msg: "User not found",
            });
          }

          // Verify the refresh token
          const decodedToken = jwt.verify(
            refreshToken as string,
            JWT_SECRET as Secret
          ) as { userId: string };

          if (!decodedToken || decodedToken.userId !== userId) {
            return res.status(401).json({
              success: false,
              msg: "Failed to verify refreshToken",
            });
          }

          // Generate a new access token
          const newAccessToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET as Secret,
            { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME }
          );

          // // Generate a new refresh token
          const newRefreshToken = user.generateRefreshTokenUser();

      
          // Save new refresh token in the user document
          user.refreshToken = newRefreshToken;
        
          await user.save();

          return res.status(200).json({
            success: true,
            newAccessToken,
            newRefreshToken,
            msg: "Successfully generated new AccessToken and RefreshToken",
          });
        } catch (err) {
             console.error("Error refreshing token:", err);
             return res.status(500).json({
               success: false,
               msg: "Internal Server Error",
             });
        }
    }

    public async logoutUser(req: Request, res: Response): Promise<Response>{
        
        try {

            const { userId } = req.body;

            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found"
                });
            }

            // Clear the refresh token
            user.refreshToken = undefined;
            await user.save();

           return res.status(200).json({
                success: true,
                msg: "User logged out successfully"
            });
        } catch (err) {
            console.error("Error logging out user:", err);
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error",
            });
        };
    };
};
