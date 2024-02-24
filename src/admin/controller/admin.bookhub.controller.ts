import { Request, Response } from "express";
import { Admin } from "../model/admin.bookhub.schema";
import { IAdmin } from "../model/admin.bookhub.interface";

export class AdminController {
  public async createAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, email, last_login, rule } = req.body;

      const newAdmin: IAdmin = new Admin({
        username,
        password,
        email,
        last_login,
        rule,
      });

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
      return res.status(500).json({
        sucess: false,
        msg: "Iteral Server Error",
      });
    }
  }
}


