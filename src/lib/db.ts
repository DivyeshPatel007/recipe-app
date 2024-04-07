
import mongoose from "mongoose";

declare global {
    var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb+srv://divppatel143:IL93DwjXWKath8yb@cluster0.0vh32ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
