import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import type { Product } from '../types/types';
import { ProductCard } from '../components/ProductCard';
import { DeleteProduct } from '../components/DeleteProduct';
import { MAX_PRODUCTS } from '../constants';

export const ProductsPage = () => {
    const { products, loading, error, refetchProducts } = useGetProducts();
    const [isOpen, setIsOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const isAtLimit = products.length >= MAX_PRODUCTS;

    return (
        <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
            {isOpen && productToDelete && (
                <DeleteProduct refetchProducts={refetchProducts} isOpen={isOpen} setIsOpen={setIsOpen} productToDelete={productToDelete} />
            )}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,#d1fae5_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_10%,#fef3c7_0%,transparent_50%),linear-gradient(180deg,#fafaf9_0%,#f5f5f4_100%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#a8a29e22_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e22_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />

            <div className="relative mx-auto w-full max-w-6xl animate-[fadeUp_0.45s_ease-out]">
                <header className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/80">
                            Catalog
                        </p>
                        <h1 className="font-[Fraunces,ui-serif,Georgia,serif] text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                            Products
                        </h1>
                        <p className="mt-3 max-w-lg text-base leading-relaxed text-stone-600">
                            Browse your inventory. Edit details or remove items when stock and pricing change.
                            Demo catalogs are limited to {MAX_PRODUCTS} products.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                        {!loading && !error && (
                            <p className="text-sm text-stone-500">
                                <span className="font-semibold text-stone-800">{products.length}</span>
                                {' / '}
                                {MAX_PRODUCTS}
                                {products.length === 1 ? ' product' : ' products'}
                            </p>
                        )}
                        {isAtLimit ? (
                            <p className="max-w-xs text-right text-sm text-amber-800">
                                Limit reached. Delete a product to add a new one.
                            </p>
                        ) : (
                            <Link
                                to="/products/new"
                                className="inline-flex items-center justify-center rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:translate-y-0"
                            >
                                New product
                            </Link>
                        )}
                    </div>
                </header>

                {loading && (
                    <div className="rounded-2xl border border-stone-200/80 bg-white/70 px-6 py-16 text-center backdrop-blur-md">
                        <p className="text-sm font-medium text-stone-500">Loading catalog…</p>
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50/90 px-6 py-8 text-center">
                        <p className="text-sm font-medium text-red-800">Error: {error}</p>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center backdrop-blur-md">
                        <p className="font-[Fraunces,ui-serif,Georgia,serif] text-2xl text-stone-800">
                            No products yet
                        </p>
                        <p className="mt-2 text-sm text-stone-500">
                            Create your first item to populate the grid.
                        </p>
                        <Link
                            to="/products/new"
                            className="mt-6 inline-flex rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                            Create product
                        </Link>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product: Product) => (
                            <ProductCard key={product._id} product={product} setProductToDelete={setProductToDelete} setIsOpen={setIsOpen} />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};
