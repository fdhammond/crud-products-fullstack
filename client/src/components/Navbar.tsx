import { Link, NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
        'text-sm font-medium transition',
        isActive ? 'text-emerald-800' : 'text-stone-600 hover:text-stone-900',
    ].join(' ');

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-20 border-b border-stone-200/80 bg-stone-50/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
                <Link
                    to="/"
                    className="font-[Fraunces,ui-serif,Georgia,serif] text-lg font-semibold tracking-tight text-stone-900"
                >
                    Products
                </Link>

                <ul className="flex items-center gap-5">
                    <li>
                        <NavLink to="/" end className={linkClass}>
                            Catalog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products/new" className={linkClass}>
                            New product
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
