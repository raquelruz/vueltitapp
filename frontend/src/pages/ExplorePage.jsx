import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TripsList } from "../components/TripsList";
import api from "../api";

export const ExplorePage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const date = searchParams.get("date") || "";

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);

            try {
                const res = await api.get("/trips", {
                    params: { search, date },
                });

                setTrips(res.data || []);
            } catch (err) {
                console.error(err);
                setTrips([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [search, date]);

    if (loading) {
        return <div className="text-center py-20">Cargando viajes...</div>;
    }

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-bg-primary backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="text-center mb-5">
                        <h1 className="text-2xl md:text-3xl font-semibold text-text">¿A dónde quieres viajar?</h1>

                        <p className="text-sm text-text-secondary mt-1">Inspírate o busca tu próxima aventura</p>
                    </div>

                    {/* SEARCH (solo visual) */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl flex items-center bg-bg-primary border border-border rounded-full px-5 py-3 shadow-sm hover:shadow-md transition">
                            <svg
                                className="w-5 h-5 text-text-secondary mr-3"
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
                                value={search}
                                readOnly
                                className="flex-1 outline-none text-text-secondary placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="mb-6 flex justify-end px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {trips.length} viajes encontrados
                    </div>
                </div>

                <TripsList trips={trips} />
            </div>
        </div>
    );
};
