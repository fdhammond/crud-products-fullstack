import { useState, useEffect } from "react";
import type { Product } from "../types/types";

export const useGetProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetchProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setError(error as string);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetchProducts();
    }, []);

    return { products, loading, error, refetchProducts };
};