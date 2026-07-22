import * as z from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    stock: z.number().int().min(0),
    image: z.string().min(1),
}).strict();

export const updateProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    stock: z.number().int().min(0),
    image: z.string().min(1),
}).strict().partial().refine((data) => {
    return Object.values(data).some(value => value !== undefined);
}, {
    message: "At least one field is required",
});