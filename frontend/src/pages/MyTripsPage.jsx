import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import api from "../api";
import { TripsFilterTabs } from "../components/Trips/TripsFilterTabs";
import { MyTripsContent } from "../components/Trips/MyTripsContent";
import { getTripCounts, getDestinationCount, getTotalDays, getRecentPastTrips } from "../utils/tripStats";
import { getTripPhase } from "../utils/tripPhase";
import { MyTripsHeader } from "../components/Trips/MyTripsHeader";
import { CreateNewTripCard } from "../components/Trips/CreateNewTripCard";
import { RecentMemories } from "../components/Trips/RecentsMemories";

export const MyTripsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");

    const loadTrips = useCallback(async () => {
        try {
            const response = await api.get(`/trips/my-trips/${id}`);
            setTrips(response.data);
            setError(null);
        } catch (error) {
            console.error("Error al cargar los viajes:", error);
            setError(error.message || "No se han podido cargar tus viajes");
        }
    }, [id]);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);

        Promise.all([
            api
                .get(`/users/${id}`)
                .then((response) => isMounted && setUser(response.data))
                .catch(() => isMounted && setUser(null)),
            loadTrips(),
        ]).finally(() => isMounted && setLoading(false));

        return () => {
            isMounted = false;
        };
    }, [id, loadTrips]);

    const remove = async (tripId) => {
        if (
            !confirm("¿Estás seguro de eliminar este viaje? Se borrarán también sus tareas, comentarios y actualizaciones.")
        ) {
            return;
        }

        try {
            await api.delete(`/trips/${tripId}`);
            loadTrips();
        } catch (error) {
            alert(error.message || "Error al eliminar el viaje");
        }
    };

    const counts = getTripCounts(trips);
    const destinationCount = getDestinationCount(trips);
    const totalDays = getTotalDays(trips);
    const recentMemories = getRecentPastTrips(trips);

    const filteredTrips =
        activeFilter === "all" ? trips : trips.filter((trip) => getTripPhase(trip) === activeFilter);

    return (
        <div className="min-h-screen bg-bg-primary">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* COLUMNA PRINCIPAL */}
                    <div className="lg:col-span-2">
                        <MyTripsHeader
                            user={user}
                            tripCount={counts.all}
                            destinationCount={destinationCount}
                            totalDays={totalDays}
                            loading={loading}
                        />

                        {/* PESTAÑAS DE FILTRO */}
                        {!loading && !error && trips.length > 0 && (
                            <div className="mb-12 mt-6">
                                <TripsFilterTabs active={activeFilter} onChange={setActiveFilter} counts={counts} />
                            </div>
                        )}

                        {/* ERROR */}
                        {error && (
                            <div className="flex items-center gap-2 rounded-xl border border-error/30 bg-error/10 text-error px-4 py-3 text-sm mb-6">
                                <FaExclamationCircle className="shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* CONTENIDO */}
                        {!loading && !error && (
                            <MyTripsContent trips={trips} filteredTrips={filteredTrips} onDelete={remove} />
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-1 lg:sticky lg:top-6 px-8">
                        <CreateNewTripCard onSuccess={loadTrips} />
                        <RecentMemories trips={recentMemories} />
                    </div>
                </div>
            </div>
        </div>
    );
};