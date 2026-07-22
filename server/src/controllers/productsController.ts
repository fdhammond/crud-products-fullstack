import { Product } from "../models/Product.js";
import { Request, Response } from "express";

const MAX_PRODUCTS = 10;

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to obtain products" });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to obtain product" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const count = await Product.countDocuments();
        if (count >= MAX_PRODUCTS) {
            res.status(400).json({
                message: `Maximum of ${MAX_PRODUCTS} products reached. Delete one to add another.`,
            });
            return;
        }
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
    }
}
