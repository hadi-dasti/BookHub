import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as path from "path";


// Connect to the MongoDB database
export async function connectDB():Promise<void> {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BookHub')
        console.log('mongodb connect successfully ')
    } catch (err) {
        console.log('MongoDB connection error:', err)
    };
};



// export default connectDB;