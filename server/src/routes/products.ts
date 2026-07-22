import { Router } from "express";
import express from "express";
import { validate } from "../middleware/validate.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productsControler.js";
import { createProductSchema, updateProductSchema } from "../schemas/productSchema.js";

const router: Router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;