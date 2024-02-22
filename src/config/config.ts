import { Secret } from "jsonwebtoken";

// Constants for JWT secret and token expiration times
export const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;