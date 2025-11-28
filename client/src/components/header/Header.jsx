import { useContext } from "react";
import { Link, useLocation } from "react-router";
import UserContext from "../../contexts/UserContext.js";

export default function Header() {
    const { pathname } = useLocation();
    const isCatalogPage = pathname === "/catalog";

    const { isAuthenticated, onLogout, user } = useContext(UserContext);

    return (

        <header className="absolute inset-x-0 top-0 z-50 text-white bg-gradient-to-b from-black/60 via-black/10 to-transparent">

            {/* Full width nav bar */}
            <nav className="w-full flex items-center justify-between px-10 py-3 -mt-5 font-['Playfair_Display']">

                {/* Left – Logo */}
                <Link
                    to="/" className="flex items-center group">
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        className="w-30 h-auto drop-shadow-xl ink-link hover-scale group-hover:drop-shadow-[0_0_25px_rgba(217,119,6,0.55)]"
                    />
                </Link>

                {/* Navigation - Center */}
                <div className="absolute left-[50%] -translate-x-1/2">

                    {!isCatalogPage && (<ul className="hidden lg:flex gap-16 text-2xl font-semibold tracking-wide">
                        <li>
                            <Link to="/" className="ink-link inline-block text-3xl hover-scale">Home</Link>
                        </li>

                        {isAuthenticated ?
                            <>
                                <li>
                                    <Link to="/create" className="ink-link inline-block text-3xl hover-scale">Add City</Link>
                                </li>

                                <li>
                                    <button onClick={onLogout} className="ink-link inline-block text-3xl hover-scale cursor-pointer">Logout</button>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to="/catalog" className="ink-link inline-block text-3xl hover-scale">Catalog</Link>
                                </li>
                                
                                <li>
                                    <Link to="/login" className="ink-link inline-block text-3xl hover-scale">
                                        Login 
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/register" className="ink-link inline-block text-3xl hover-scale">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                    )}
                </div>

                {/* Right - Login/Email */}
                <div className="hidden lg:block text-3xl font-semibold tracking-wide ml-6">
                    {isAuthenticated && (
                        <div>
                            <p className="ink-link inline-block text-m flex items-center gap-2 hover-scale cursor-pointer">{user.email}</p>
                        </div>)
                       }

                </div>

            </nav>
        </header>
    );
};