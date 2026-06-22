import { useState } from "react";
import api from "../api";

export const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState("");
    const [travelers, setTravelers] = useState("1");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        if (!searchQuery.trim()) {
            setError("Por favor, ingresa un término de búsqueda");
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.get("/trips", {
                params: {
                    search: searchQuery,
                    date,
                    travelers,
                },
            });

            // 🔥 IMPORTANTE: el interceptor ya devuelve data directo
            const trips = Array.isArray(response) ? response : response?.trips || [];

            if (typeof onSearch === "function") {
                onSearch(trips);
            }

        } catch (error) {
            setError("Error al buscar viajes");

            if (typeof onSearch === "function") {
                onSearch([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mb-16 transform transition-all duration-500 hover:scale-105">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">

                <form onSubmit={handleSearch}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* DESTINO */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Destino
                            </label>

                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="¿A dónde vamos?"
                                className="w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm"
                            />
                        </div>

                        {/* FECHA */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Fechas
                            </label>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm"
                            />
                        </div>

                        {/* VIAJEROS */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Viajeros
                            </label>

                            <select
                                value={travelers}
                                onChange={(e) => setTravelers(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm"
                            >
                                <option value="1">1 Viajero</option>
                                <option value="2">2 Viajeros</option>
                                <option value="3+">3+ Viajeros</option>
                            </select>
                        </div>

                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-3">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-60"
                        style={{
                            background: "linear-gradient(135deg, #0047AB 0%, #00D2FF 100%)",
                        }}
                    >
                        {isLoading ? "Buscando..." : "Buscar experiencias"}
                    </button>

                </form>
            </div>
        </div>
    );
};