import { useParams } from "react-router-dom";
import { useGetProductById } from "../hooks/useGetProductById";
import { ProductCardDetail } from "../components/ProductCardDetail";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner/Spinner";

export const ViewProductPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useGetProductById(id);

    return (
        <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,#d1fae5_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_10%,#fef3c7_0%,transparent_50%),linear-gradient(180deg,#fafaf9_0%,#f5f5f4_100%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#a8a29e22_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e22_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />

            <div className="relative mx-auto w-full max-w-2xl animate-[fadeUp_0.45s_ease-out]">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-emerald-800"
                >
                    <span aria-hidden>←</span> Back to products
                </Link>

                <header className="mb-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/80">
                        Product
                    </p>
                    <h1 className="font-[Fraunces,ui-serif,Georgia,serif] text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                        {product?.name ?? (loading ? "Loading…" : "Product")}
                    </h1>
                    {product?.description && (
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600">
                            {product.description}
                        </p>
                    )}
                </header>

                {loading && (
                    <div className="flex justify-center items-center rounded-2xl border border-stone-200/80 bg-white/70 py-20 backdrop-blur-md">
                        <Spinner />
                    </div>
                )}

                {!loading && product && (
                    <ProductCardDetail product={product} />
                )}

                {!loading && error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50/90 px-6 py-8 text-center">
                        <p className="text-sm font-medium text-red-800">Error: {error}</p>
                    </div>
                )}
            </div>
        </section>
    );
};
