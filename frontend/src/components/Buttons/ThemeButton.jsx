import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

export const ThemeButton = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out bg-white/5 hover:bg-white/10 border border-white/10 shadow-md hover:shadow-lg backdrop-blur-md group active:scale-95 ${className}`}>
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* SUN */}
                <FaSun
                    className={`
                        absolute transition-all duration-300
                        text-indigo-50
                        ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}
                    `}
                />

                {/* MOON */}
                <FaMoon
                    className={`
                        absolute transition-all duration-300
                        text-blue-300
                        ${theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
                    `}
                />
            </div>
        </button>
    );
};