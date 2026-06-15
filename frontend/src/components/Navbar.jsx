import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaRegUser, FaRegCompass } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";
import { ThemeBtn } from "./buttons/ThemeBtn";

const publicLinks = [
    { path: "/", label: "Inicio", icon: <FaHome /> },
    { path: "/explore", label: "Explorar", icon: <FaSearch /> },
    { path: "/my-trips", label: "Mis viajes", icon: <MdCardTravel /> },
    { path: "/profile", label: "Mi perfil", icon: <FaRegUser /> },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const isAuthenticated = !!user;

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
        setIsOpen(false);
    }, [logout]);

    return (
        <nav
            className="sticky top-0 z-50 bg-gradient-to-r from-bg-primary via-bg-card to-bg-primary backdrop-blur-md shadow-2xl border-b"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* HEADER */}
                <div className="flex items-center justify-between py-4 md:py-5">
                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)",
                            }}
                        >
                            <FaRegCompass className="text-xl" />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-semibold tracking-tight text-text">VueltitApp</span>
                            <span className="text-xs tracking-[0.2em] uppercase text-text-secondary font-medium">
                                COMUNIDAD VIAJERA
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center gap-1">
                        {publicLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative px-3 py-2 text-sm font-medium text-text flex items-center gap-1.5 group"
                            >
                                <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                                    {link.icon}
                                </span>
                                <span>{link.label}</span>

                                <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-text" />
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT BUTTONS */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="
        hidden md:flex items-center px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 active:scale-95 bg-transparent text-text border-gray-300 hover:bg-bg-card hover:border-gray-40"
                                >
                                    Iniciar sesión
                                </Link>

                                <Link
                                    to="/register"
                                    className="hidden md:flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-md bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="hidden md:flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-red-200 border border-red-500/20 bg-red-500/10 backdrop-blur-md hover:bg-red-500/20 hover:text-red-100 transition-all duration-300 active:scale-95"
                            >
                                Cerrar sesión
                            </button>
                        )}

                        {/* THEME BUTTON (REUTILIZABLE) */}
                        <ThemeBtn />

                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                {isOpen ? <path d="M6 6l12 12M6 18l12-12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isOpen && (
                    <div className="lg:hidden border-t border-gray-700 py-3">
                        <div className="flex flex-col gap-1">
                            {publicLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className="px-3 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-white/10 flex items-center gap-2.5"
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            ))}

                            <div className="my-2 border-t border-gray-700" />

                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10"
                                    >
                                        Iniciar sesión
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={closeMenu}
                                        className="px-3 py-3 rounded-xl text-sm font-semibold text-white"
                                        style={{
                                            background: "linear-gradient(135deg, #0047AB 0%, #00D2FF 100%)",
                                        }}
                                    >
                                        Crear cuenta
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMenu();
                                    }}
                                    className="px-3 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                                >
                                    Cerrar sesión
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
