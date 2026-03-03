import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGODBURL) {
            throw new Error("MONGODBURL is undefined. Check your .env file.");
        }

        await mongoose.connect(process.env.MONGODBURL);

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};