import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const ExploreHeader = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const date = searchParams.get("date") || "";

    const [inputValue, setInputValue] = useState(search);
    const [inputDate, setInputDate] = useState(date);
    const debounceTimer = useRef(null);

    // Debounce: espera 500ms sin escribir antes de navegar
    useEffect(() => {
        // Limpiar timer anterior
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Crear nuevo timer
        debounceTimer.current = setTimeout(() => {
            const params = new URLSearchParams();
            if (inputValue) params.append("search", inputValue);
            if (inputDate) params.append("date", inputDate);

            const newUrl = inputValue || inputDate 
                ? `/explore?${params.toString()}` 
                : "/explore";

            navigate(newUrl, { replace: true });
        }, 500); // Espera 500ms después de dejar de escribir

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [inputValue, inputDate, navigate]);

    const handleClear = () => {
        setInputValue("");
        setInputDate("");
    };

    const hasFilters = inputValue || inputDate;

    return (
        <div className="sticky top-0 z-20 bg-linear-to-b from-bg-primary to-bg-primary/80 backdrop-blur-xl border-b border-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                        ¿A dónde quieres viajar?
                    </h1>
                    <p className="text-text-secondary mt-3 text-sm md:text-base max-w-2xl mx-auto">
                        Explora destinos increíbles y planifica tu próxima aventura
                    </p>
                </div>

                <div className="flex justify-center px-2 mb-4">
                    <div className="w-full max-w-4xl group">
                        <div className="flex flex-col md:flex-row gap-3 md:gap-0 bg-bg-card border border-border group-hover:border-primary-500 rounded-2xl md:rounded-full px-4 md:px-6 py-4 md:py-5 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center md:mr-3">
                                <svg
                                    className="w-5 h-5 text-primary-500 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Paris, Barcelona, Tokio..."
                                className="flex-1 outline-none text-text-primary placeholder-text-muted bg-transparent text-sm md:text-base font-medium transition-colors"
                                autoComplete="off"
                            />

                            {(inputValue || inputDate) && <div className="hidden md:block w-px h-6 bg-border/50" />}

                            <input
                                type="date"
                                value={inputDate}
                                onChange={(e) => setInputDate(e.target.value)}
                                className="outline-none text-text-secondary bg-transparent cursor-pointer text-sm md:text-base transition-colors focus:text-text-primary md:pl-3 md:pr-2"
                            />

                            {hasFilters && (
                                <button
                                    onClick={handleClear}
                                    className="md:ml-2 p-2 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-error-500 transition-all duration-200 flex items-center justify-center"
                                    title="Limpiar búsqueda"
                                    aria-label="Limpiar filtros"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
