import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import { connectDB } from "./config/db.js";

import productsRouter from "./routes/products.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);

await connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});
