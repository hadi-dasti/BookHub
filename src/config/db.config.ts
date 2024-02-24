import mongoose from "mongoose";
import { MONGODB_URI } from "./config";


// Connect to the MongoDB database
export async function connectDB():Promise<void> {
    try {  
        await mongoose.connect(MONGODB_URI);
        console.log('mongodb connect successfully ')
    } catch (err) {
        console.log('MongoDB connection error:', err)
    };
};
