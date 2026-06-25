import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!searchQuery.trim()) {
            setError("Introduce un destino");
            return;
        }

        setIsLoading(true);

        try {
            if (onSearch) {
                await onSearch({ search: searchQuery, date });
            }
        } catch (error) {
            setError("Error al buscar viajes");
        } finally {
            setIsLoading(false);
        }
    };

    const renderSpinner = () => (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );

    const renderIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
    );

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full shadow-xl border border-gray-200 overflow-hidden transition hover:shadow-2xl">

                <div className="flex-1 px-5 py-4 flex flex-col justify-center hover:bg-gray-50 transition">
                    <span className="text-[11px] text-gray-500">Destino</span>
                    <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="¿A dónde quieres ir?"
                        className="text-sm outline-none bg-transparent text-gray-800"
                    />
                </div>

                <div
                    className="flex-1 px-5 py-4 flex flex-col justify-center hover:bg-gray-50 transition">
                    <span className="text-[11px] text-gray-500">Fecha</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        className="text-sm outline-none bg-transparent text-gray-800"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="m-3 md:m-2 md:w-12 h-12 rounded-xl md:rounded-full  bg-linear-to-r from-blue-600 to-primary-light  text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-5"
                >
                    {isLoading ? renderSpinner() : renderIcon()}

                </button>
            </div>

            {/* ERROR */}
            {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        </form>
    );
};
