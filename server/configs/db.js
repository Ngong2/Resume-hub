import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        const dbName = process.env.MONGODB_DB || "ResumeHub";

        if (!uri) {
            throw new Error("MONGODB_URI not set in environment variables");
        }

        if (uri.endsWith('/')) uri = uri.slice(0, -1);

        // Connect to MongoDB without unsupported options
        await mongoose.connect(uri, { dbName });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;
