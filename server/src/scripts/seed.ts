import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { faker } from "@faker-js/faker";
import dns from "node:dns";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

const productMock =
    Array.from({ length: 10 }, () => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 1000, max: 10000 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        image: faker.image.url(),
    }));

const seed = async (products: IProduct[]) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        await Product.deleteMany({});
        console.log("Products deleted successfully from the database");
        console.log("Seeding products...");
        await Product.insertMany(products);
        console.log("Products seeded successfully to the database");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seed(productMock); 