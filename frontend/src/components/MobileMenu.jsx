import { Link } from "react-router-dom";
import { LogoutButton } from "./Buttons/LogoutButton";

export const MobileMenu = ({ links, closeMenu, user, handleLogout }) => {
    return (
        <div className="lg:hidden border-t border-border py-3 bg-bg-secondary/50">
            <div className="flex flex-col gap-1 px-2">
                {/* Navegación */}
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={closeMenu}
                        className="px-3 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg-tertiary flex items-center gap-2.5 transition-colors duration-200"
                    >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}

                <div className="my-2 border-t border-border" />

                {/* Auth Buttons - SOLO EN MOBILE */}
                <div className="flex flex-col gap-2">
                    {user && (
                        <LogoutButton 
                            baseClass="w-full px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300" 
                            onClick={() => {
                                handleLogout();
                                closeMenu();
                            }}
                        />
                    )}
                    {!user && (
                        <>
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="w-full px-4 py-3 rounded-lg text-sm font-medium text-text-primary border border-border hover:bg-bg-tertiary text-center transition-all duration-300"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                onClick={closeMenu}
                                className="w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-linear-to-r from-primary-600 to-primary-500 text-center hover:shadow-lg transition-all duration-300"
                            >
                                Crear cuenta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
