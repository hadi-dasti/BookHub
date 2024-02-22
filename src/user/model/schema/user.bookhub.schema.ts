import { Schema, model } from "mongoose";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from '../interface/user.bookhub.interface';
import { hashPassword, comparePassword } from '../../utils/user.password.utils';
import {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
} from "../../../config/config";



const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, isEmail: true, required: true, unique: true },
    password: {
      type: String,
      unique: false,
      minlength: 8,
      select: false,
    },
    nationalCode: { type: String, minlength: 9, unique: true },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    refreshToken: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (err) {
        return next(err)
    }
});

userSchema.methods.comparePassword = async function (password: string) {
    return await comparePassword(password, this.password);
};

// create accessToken for user with userId
userSchema.methods.generateAccessTokenUser = function () {
  const accessToken = jwt.sign({ userId: this._id }, JWT_SECRET as Secret, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  });
  return accessToken;
};

// create refreshToken for employee with userId
userSchema.methods.generateRefreshTokenUser = function () {
  const refreshToken = jwt.sign(
    { userId: this._id },
    JWT_SECRET as Secret,
    { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME }
  );
  return refreshToken;
};



// Create a Model.
export const User = model<IUser>("User", userSchema);