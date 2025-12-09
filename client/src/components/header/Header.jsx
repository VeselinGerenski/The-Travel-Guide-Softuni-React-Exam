
import { Link, useLocation } from "react-router";
import { useUserContext } from "../../contexts/UserContext.js";

export default function Header() {
    const { pathname } = useLocation();
    const hideNav = pathname === "/catalog" || pathname === "/profile";

    const { isAuthenticated, user } = useUserContext()

    return (

        <header className="absolute inset-x-0 top-0 z-50 text-white bg-gradient-to-b from-black/60 via-black/10 to-transparent">

            {/* Full width nav bar */}
            <nav className="w-full h-25 flex items-center justify-between px-10 font-['Playfair_Display']">

                {/* Left – Logo */}
                <Link to="/" className="flex items-center group">
                    <img
                        src="/images/logo6.png"
                        alt="logo"
                        className="h-30 ml-3 w-auto translate-y-[15px] drop-shadow-xl ink-link hover-scale group-hover:drop-shadow-[0_0_25px_rgba(217,119,6,0.55)]"
                    />
                </Link>

                {/* Navigation - Center */}
                <div className="absolute left-[50%] -translate-x-1/2">

                    {!hideNav && (
                        <ul className="hidden lg:flex gap-16 text-2xl font-semibold tracking-wide">

                            <li>
                                <Link to="/catalog" className="ink-link inline-block text-3xl hover-scale">Catalog</Link>
                            </li>

                            {isAuthenticated ?
                                <>
                                    <li>
                                        <Link to="/create" className="ink-link inline-block text-3xl hover-scale">Add City</Link>
                                    </li>

                                    <li>
                                        <Link to="/logout" className="ink-link inline-block text-3xl hover-scale">Logout</Link>
                                    </li>
                                </>
                                :
                                <>

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


                {/* Right - Username / Profile */}
                {isAuthenticated && (
                    <div className="hidden lg:flex items-center justify-end ml-6">
                        <Link
                            to="/profile"
                            className="group flex items-center gap-3 cursor-pointer"
                        >
                            <div
                                className="
          h-15 w-15 rounded-full
          bg-white/20 
          backdrop-blur-sm
          flex items-center justify-center
          border border-white/40
          shadow-[0_0_12px_rgba(255,255,255,0.25)]
          group-hover:border-amber-400
          group-hover:shadow-[0_0_18px_rgba(245,158,11,0.55)]
          transition-all duration-200  hover-scale
        "
                            >
                                <span className="text-xl font-semibold uppercase text-white/90 tracking-wide">
                                    {user?.fullName?.[0] || "P"}
                                </span>
                            </div>
                        </Link>
                    </div>
                )}

            </nav>
        </header>
    );
};