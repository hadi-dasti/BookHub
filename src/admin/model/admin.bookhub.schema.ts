import { Schema, model } from "mongoose";
import jwt, { Secret } from "jsonwebtoken";
import { IAdmin } from "./admin.bookhub.interface";
import { JWT_SECRET_ADMIN, JWT_ACCESS_TOKEN_EXPIRATION_TIME_ADMIN } from "../../config/config";
import { hashPasswordAdmin } from "../utils/admin.password.utile";

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  last_login: { type: Date, default: null },
  rule: { type: String, enum: ["admin", "management"], default: "admin" },
},
  {
    timestamps: true
  });


adminSchema.pre<IAdmin>('save', async function (next) {
  try {

    const admin = this;

    if (!admin.isModified("password")) {
      return next();
    }

    this.password = await hashPasswordAdmin(this.password);

    return next();
  } catch (err) {
    console.log(err);
  }
});

adminSchema.methods.generateAccessTokenAdmin = function () {
  const accessToken = jwt.sign(
    { adminId: this._id },
    JWT_SECRET_ADMIN as Secret,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME_ADMIN,
    }
  );
  return accessToken;
};

//Method to serialize Admin object
adminSchema.methods.serialize = function (): any {
    return {
        _id: this._id,
        username: this.username,
        email: this.email,
        last_login: this.last_login,
        rule: this.rule,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};


export const Admin = model<IAdmin>("Admin", adminSchema);