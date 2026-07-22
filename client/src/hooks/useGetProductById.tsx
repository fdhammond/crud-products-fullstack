import { useEffect, useState } from 'react';
import type { Product } from '../types/types';

export const useGetProductById = (id: string | undefined) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setProduct(null);
            setError('Product not found');
            setLoading(false);
            return;
        }

        const fetchProductById = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
                const result = await response.json();
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                setProduct(result);
            } catch (err) {
                console.error(err);
                setProduct(null);
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();
    }, [id]);

    return { product, loading, error };
};
