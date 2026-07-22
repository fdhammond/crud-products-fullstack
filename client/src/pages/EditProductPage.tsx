import { Link, useParams } from 'react-router-dom';
import { useGetProductById } from '../hooks/useGetProductById';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner/Spinner';

const fieldClass =
    'w-full rounded-lg border border-stone-300/80 bg-white/80 px-3.5 py-2.5 text-stone-900 shadow-sm outline-none transition duration-200 placeholder:text-stone-400 hover:border-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20';

const labelClass = 'mb-1.5 block text-sm font-medium tracking-wide text-stone-600';

export const EditProductPage = () => {
    const { id } = useParams();
    const { product } = useGetProductById(id);
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const data = await response.json();
            setLoading(false);
            setSuccess(true);
            return data;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!product) return;
        setProductData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image,
        });
    }, [product]);

    if (!id) return <Spinner />;
    if (!product) return <Spinner />;

    return (
        <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden px-4 py-10 sm:py-14">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,#d1fae5_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_10%,#fef3c7_0%,transparent_50%),linear-gradient(180deg,#fafaf9_0%,#f5f5f4_100%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#a8a29e22_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e22_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />

            <div className="relative mx-auto w-full max-w-xl animate-[fadeUp_0.45s_ease-out]">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-emerald-800"
                >
                    <span aria-hidden>←</span> Back to products
                </Link>

                <header className="mb-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/80">
                        Catalog
                    </p>
                    <h1 className="font-[Fraunces,ui-serif,Georgia,serif] text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                        {success ? 'All set' : 'Edit product'}
                    </h1>
                    {!success && (
                        <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600">
                            Update the listing details. Keep copy and pricing clear for the catalog grid.
                        </p>
                    )}
                    {success && (
                        <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600">
                            Your changes are saved and ready in the catalog.
                        </p>
                    )}
                </header>
                {
                    loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Spinner />
                        </div>
                    ) : !success && !loading ? (
                        <form onSubmit={(e) => handleSubmit(e)} className="space-y-5 rounded-2xl border border-stone-200/80 bg-white/70 p-6 shadow-[0_1px_0_rgba(28,25,23,0.04)] backdrop-blur-md sm:p-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className={labelClass}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={productData.name}
                                        className={fieldClass}
                                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className={labelClass}>Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={productData.description}
                                        rows={3}
                                        className={`${fieldClass} resize-y`}
                                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="price" className={labelClass}>Price</label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-stone-400">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={productData.price}
                                                className={`${fieldClass} pl-8`}
                                                onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="stock" className={labelClass}>Stock</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            name="stock"
                                            value={productData.stock}
                                            className={fieldClass}
                                            onChange={(e) => setProductData({ ...productData, stock: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="image" className={labelClass}>Image URL</label>
                                    <input
                                        type="url"
                                        id="image"
                                        name="image"
                                        value={productData.image}
                                        className={fieldClass}
                                        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                                    />
                                    {product.image ? (
                                        <div className="mt-3 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-40 w-full object-cover"
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-stone-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                    to={`/`}
                                    className="text-center text-sm font-medium text-stone-500 transition hover:text-stone-800 sm:text-left"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="hover:cursor-pointer inline-flex items-center justify-center rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:translate-y-0"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    ) : success ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/80 bg-white/70 px-6 py-12 text-center shadow-[0_1px_0_rgba(28,25,23,0.04)] backdrop-blur-md sm:px-10 sm:py-14">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-2xl font-semibold text-emerald-800">
                                ✓
                            </div>
                            <p className="font-[Fraunces,ui-serif,Georgia,serif] text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                                Successfully updated
                            </p>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500">
                                {productData.name
                                    ? `"${productData.name}" is now up to date in your catalog.`
                                    : 'Your product is now up to date in your catalog.'}
                            </p>
                            <button
                                type="button"
                                className="hover:cursor-pointer mt-8 inline-flex items-center justify-center rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:translate-y-0"
                                onClick={() => navigate('/')}
                            >
                                Go to products
                            </button>
                        </div>
                    ) : null
                }
            </div>
        </section>
    );
};

