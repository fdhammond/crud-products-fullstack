import { NextFunction, Request, Response } from "express";
import * as z from "zod";

export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ message: "Validation failed", errors: result.error.issues });
            return;
        }
        req.body = result.data;
        next();
    }
};