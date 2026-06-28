import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SearchBar = ({ searchValue = "", dateValue = "" }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(searchValue);
    const [inputDate, setInputDate] = useState(dateValue);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (inputValue) params.append("search", inputValue);
        if (inputDate) params.append("date", inputDate);

        navigate(`/explore?${params.toString()}`);
    };

    const handleClear = () => {
        setInputValue("");
        setInputDate("");
        navigate("/explore");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const hasFilters = inputValue || inputDate;

    return (
        <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-3xl">
                <div className="flex items-center gap-3 bg-bg-card border border-border rounded-2xl px-5 py-4 shadow-lg hover:shadow-xl hover:border-primary-500 transition-all duration-300">
                    <svg
                        className="w-5 h-5 text-text-secondary shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="¿A dónde quieres ir?"
                        className="flex-1 outline-none text-text-primary placeholder-text-muted bg-transparent text-sm md:text-base transition-colors"
                    />

                    {inputValue && <div className="w-px h-6 bg-border" />}

                    <input
                        type="date"
                        value={inputDate}
                        onChange={(event) => setInputDate(event.target.value)}
                        onKeyPress={handleKeyPress}
                        className="outline-none text-text-secondary bg-transparent cursor-pointer text-sm md:text-base transition-colors focus:text-text-primary"
                    />

                    {inputDate && <div className="w-px h-6 bg-border" />}

                    <button
                        onClick={handleSearch}
                        className="p-2.5 rounded-full bg-linear-to-r from-primary-600 to-primary-500 text-white shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 shrink-0"
                        title="Buscar"
                        aria-label="Buscar viajes"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {hasFilters && (
                        <button
                            onClick={handleClear}
                            className="p-2 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-error-500 transition-colors duration-200"
                            title="Limpiar búsqueda"
                            aria-label="Limpiar filtros"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <p className="text-center text-text-muted text-xs md:text-sm mt-3">
                    Busca por destino, ciudad o fecha de viaje
                </p>
            </div>
        </div>
    );
};
