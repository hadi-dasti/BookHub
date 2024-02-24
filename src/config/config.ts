import { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
import * as path from "path";

dotenv.config({path:path.join(__dirname, './../../.env')});

/**
 * Setup MongoDB in project BookHub.
 * Make sure to set this environment variable in your production environment.
 */
export const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Access token expiration time for regular users.
 * Make sure to set this environment variable in your production environment.
 */
export const JWT_SECRET= process.env.JWT_SECRET as Secret;
export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN as Secret;

/**
 * Access token expiration time for regular users.
 * Make sure to set this environment variable in your production environment.
 */
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME: string | undefined = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME: string | undefined = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;

/**
 * Access token expiration time for admin 
 * Make sure to set this environment variable in your production environment.
 */
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME_ADMIN: string | undefined = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_ADMIN;