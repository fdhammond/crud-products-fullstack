import type { Product } from '../types/types';
import { useState, useEffect } from 'react';

export const ProductCardDetail = ({ product }: { product: Product }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
    }

    useEffect(() => {
        if (!isCopied) return;
        const id = setTimeout(() => setIsCopied(false), 2000);
        return () => clearTimeout(id);
    }, [isCopied]);

    return (
        <article className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/70 shadow-[0_1px_0_rgba(28,25,23,0.04)] backdrop-blur-md">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 sm:aspect-[2/1]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-5 p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-stone-200/80 bg-stone-50/80 px-4 py-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                            Price
                        </p>
                        <p className="mt-1 font-[Fraunces,ui-serif,Georgia,serif] text-2xl font-semibold tracking-tight text-emerald-800">
                            ${product.price.toLocaleString()}
                        </p>
                    </div>
                    <div className="rounded-xl border border-stone-200/80 bg-stone-50/80 px-4 py-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                            Stock
                        </p>
                        <p className="mt-1 font-[Fraunces,ui-serif,Georgia,serif] text-2xl font-semibold tracking-tight text-stone-900">
                            {product.stock}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={(e) => handleShare(e)}
                    className={`flex w-full items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-semibold transition duration-200 hover:cursor-pointer ${
                        isCopied
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                >
                    {isCopied ? 'Link copied' : 'Share product'}
                </button>
            </div>
        </article>
    );
};
