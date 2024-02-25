import { Schema, model } from "mongoose";
import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { IUser } from '../interface/user.bookhub.interface';
import { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRATION_TIME, JWT_REFRESH_TOKEN_EXPIRATION_TIME } from "../../../config/config";



const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, isEmail: true, required: true },
    password: { type: String, minlength: 8, select: false },
    nationalCode: { type: String, minlength: 9, unique: true },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    refreshToken: { type: String, select: false },
    refreshTokenExpiresAt: { type: Date, select: false },
    orders: [{ type: Schema.Types.ObjectId, ref: "OrderBook" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this
  if (!user.isModified("password")) {
    return next();
  }

    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  
});

// compare password
userSchema.methods.isComparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// create accessToken for user with userId
userSchema.methods.generateAccessTokenUser = function () {
   return jwt.sign({ userId: this._id }, JWT_SECRET as Secret, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

// create refreshToken for employee with userId
userSchema.methods.generateRefreshTokenUser = function () {
  return jwt.sign({ userId: this._id }, JWT_SECRET as Secret, { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME });
};


// Create a Model.
export const User = model<IUser>("User", userSchema);