import { useCallback, useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { FaHome, FaSearch, FaRegUser, FaRegCompass } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";
import { ThemeButton } from "./Buttons/ThemeButton";
import { MobileMenu } from "./MobileMenu";
import { LogoutButton } from "./Buttons/LogoutButton";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const publicLinks = [
        { path: "/", label: "Inicio", icon: <FaHome /> },
        { path: "/explore", label: "Explorar", icon: <FaSearch /> },
        { path: user ? `/my-trips/${user.id}` : "/login", label: "Mis viajes", icon: <MdCardTravel /> },
        { path: "/profile", label: "Mi perfil", icon: <FaRegUser /> },
    ];

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
        closeMenu();
    }, [logout, closeMenu]);

    return (
        <nav className="sticky top-0 z-50 bg-bg-primary backdrop-blur-md shadow-lg border-b border-border">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between py-4 md:py-5">
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-text-primary shadow-lg transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-primary-600 to-primary-400">
                            <FaRegCompass className="text-xl" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-semibold tracking-tight text-text-primary">VueltitApp</span>
                            <span className="text-xs tracking-widest uppercase text-text-muted font-medium">
                                Comunidad viajera
                            </span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {publicLinks.map((link) => (
                            <RouterNavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative px-3 py-2 text-sm font-medium flex items-center gap-1.5 group ${isActive ? "text-primary" : "text-text-primary"}`
                                }
                            >
                                <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                                    {link.icon}
                                </span>
                                <span>{link.label}</span>
                                <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-text-primary" />
                            </RouterNavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        {user && (
                            <LogoutButton
                                baseClass="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95"
                                onClick={handleLogout}
                            />
                        )}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-medium border border-border text-text-primary hover:bg-bg-secondary transition-all duration-300 active:scale-95"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-medium text-white bg-linear-to-r from-primary-600 to-primary-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        )}

                        <ThemeButton />

                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                {isOpen && <path d="M6 6l12 12M6 18l12-12" />}
                                {!isOpen && <path d="M3 6h18M3 12h18M3 18h18" />}
                            </svg>
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <MobileMenu links={publicLinks} closeMenu={closeMenu} user={user} handleLogout={handleLogout} />
                )}
            </div>
        </nav>
    );
};
