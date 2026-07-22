import mongoose from "mongoose";

export const connectDB = async () => {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        throw new Error("MONGODB_URI is not set");
    }
    try {
        await mongoose.connect(mongodbUri as string);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
};