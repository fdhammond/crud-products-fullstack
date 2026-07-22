import { Link } from 'react-router-dom';
import type { Product } from '../types/types';

export const ProductCard = ({ product, setProductToDelete, setIsOpen }: { product: Product, setProductToDelete: (product: Product) => void, setIsOpen: (isOpen: boolean) => void }) => {
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProductToDelete(product);
        setIsOpen(true);
    }
    return (
        <li className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white/70 shadow-[0_1px_0_rgba(28,25,23,0.04)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex-1">
                    <h2 className="font-[Fraunces,ui-serif,Georgia,serif] text-xl font-semibold tracking-tight text-stone-900">
                        {product.name}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-baseline justify-between gap-3 border-t border-stone-200/80 pt-3">
                    <p className="text-lg font-semibold text-emerald-800">
                        ${product.price.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                        Stock <span className="text-stone-700">{product.stock}</span>
                    </p>
                </div>

                <div className="flex gap-2 pt-1">
                    <Link
                        to={`/products/${product._id}/edit`}
                        className="flex flex-1 items-center justify-center rounded-lg bg-stone-900 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        onClick={(e) => handleDelete(e)}
                        className="hover:cursor-pointer flex flex-1 items-center justify-center rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-800"
                    >
                        Delete
                    </button>
                    <Link
                        to={`/products/${product._id}`}
                        className="flex flex-1 items-center justify-center rounded-lg bg-stone-200 px-3 py-2 text-center text-sm font-semibold text-stone-700 transition hover:bg-stone-300"
                    >
                        View
                    </Link>
                </div>
            </div>
        </li>
    );
};
