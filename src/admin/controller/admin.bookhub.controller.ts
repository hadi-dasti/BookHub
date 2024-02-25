import { Request, Response } from "express";
import { Admin } from "../model/admin.bookhub.schema";
import { IAdmin } from "../model/admin.bookhub.interface";

export class AdminController {
  // Method to handle creation of new admin
  public async createAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, email, rule } = req.body;

      const newAdmin: IAdmin = new Admin({
        username,
        password,
        email,
        rule,
      });

      // Generate access token for the new admin
      const adminToken = newAdmin.generateAccessTokenAdmin();

      await newAdmin.save();

      return res.status(201).json({
        success: true,
        data: {
          adminToken,
          newAdmin: newAdmin.serialize,
        },
        msg: "Admin created successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        sucess: false,
        msg: "Iteral Server Error",
      });
    }
  }
}
