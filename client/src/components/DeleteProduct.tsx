import type { Product } from '../types/types';
import { useState } from 'react';
import { Spinner } from './Spinner/Spinner';

export const DeleteProduct = ({ refetchProducts, isOpen, setIsOpen, productToDelete }: { refetchProducts: () => void, isOpen: boolean, setIsOpen: (isOpen: boolean) => void, productToDelete: Product | null }) => {
    const [loading, setLoading] = useState(false);
    if (!isOpen || !productToDelete) return null;

    const handleDelete = async () => {
        if (!productToDelete) return;
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productToDelete._id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                setLoading(false)
                throw new Error("Failed to delete product");
            }
            await refetchProducts();
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    if (loading) return (
        <div className="fixed inset-0 z-50 bg-stone-900/50 flex flex-col items-center justify-center h-full backdrop-blur-sm">
            <Spinner />
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-stone-900/50 flex flex-col items-center justify-center h-full backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-stone-200 h-[14rem] w-full max-w-md">
                <h1 className="text-2xl font-bold text-stone-900">Delete Product</h1>
                <p className="text-md text-stone-500 mt-2">Are you sure you want to delete this product?</p>
                <div className="flex gap-2 mx-auto mt-6">
                    <button className="bg-stone-900 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-stone-800 transition-all duration-200" onClick={handleDelete}>Delete</button>
                    <button className="bg-stone-200 text-stone-900 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-stone-300 transition-all duration-200" onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};