import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as path from "path";


// Load environment variables from .env files
dotenv.config({path:path.join(__dirname, './../../.env')});

// config url
export const MONGODB_URI: string = process.env.MONGODB_URI ; 

// Connect to the MongoDB database
export async function connectDB():Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('mongodb connect successfully ')
    } catch (err) {
        console.log('MongoDB connection error:', err)
    };
};
