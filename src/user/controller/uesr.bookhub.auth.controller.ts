import { Request, Response } from "express";
import { User } from "../model/schema/user.bookhub.schema";
import { IUser } from "../model/interface/user.bookhub.interface";


export class UserAuthController {
  // Register a new user
  public async registerUserBookHub(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { fullName, email, password, nationalCode, gender } = req.body;

      // Create a new user
      const createUser: IUser = await User.create({
        fullName,
        email,
        password,
        nationalCode,
        gender,
      });

      if (!createUser) {
        return res.status(400).json({
          success: false,
          msg: "Failed to create user",
        });
      }

      return res.status(201).json({
        success: true,
        msg: "User created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "internal Server Error",
      });
    }
  }

  // Login a user
  public async loginUserBookHub(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user: IUser = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
      }

      // Validate the password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          msg: "Invalid password",
        });
      }

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken; // Save the refresh token to the user document
      await user.save(); // Save the user with the updated refresh token

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Iteral Server Error",
      });
    }
  }
}
