import mongoose from "mongoose";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

export const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);