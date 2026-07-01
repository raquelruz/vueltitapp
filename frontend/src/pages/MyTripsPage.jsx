import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import api from "../api";
import { TripCard } from "../components/TripCard";
import { TripsFilterTabs } from "../components/Trips/TripsFilterTabs";
import { TripsEmptyState } from "../components/Trips/TripsEmptyState";
import { getTripPhase } from "../utils/tripPhase";
import { TripsSkeletonGrid } from "../components/Trips/TripsSkeletonGrid";
import { MyTripsHeader } from "../components/Trips/MyTripsHeader";

const getTripDurationInDays = (trip) => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

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

    const counts = {
        all: trips.length,
        upcoming: trips.filter((trip) => getTripPhase(trip) === "upcoming").length,
        ongoing: trips.filter((trip) => getTripPhase(trip) === "ongoing").length,
        past: trips.filter((trip) => getTripPhase(trip) === "past").length,
    };

    const destinationCount = new Set(trips.map((trip) => trip.city)).size;
    const totalDays = trips.reduce((sum, trip) => sum + getTripDurationInDays(trip), 0);

    const filteredTrips =
        activeFilter === "all" ? trips : trips.filter((trip) => getTripPhase(trip) === activeFilter);

    return (
        <div className="min-h-screen bg-bg-primary">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="mb-8 inline-block">
                    <div className="px-8 py-2 rounded-full border border-border bg-white/10 backdrop-blur-md">
                        <Link to="/" className="text-sm font-semibold text-primary-500">
                            ← Volver a usuarios
                        </Link>
                    </div>
                </div>

                <MyTripsHeader
                    user={user}
                    tripCount={counts.all}
                    destinationCount={destinationCount}
                    totalDays={totalDays}
                    loading={loading}
                />

                {/* PESTAÑAS DE FILTRO */}
                {!loading && !error && trips.length > 0 && (
                    <div className="mb-6">
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
                {loading && <TripsSkeletonGrid />}

                {!loading && !error && trips.length === 0 && <TripsEmptyState variant="none" />}

                {!loading && !error && trips.length > 0 && filteredTrips.length === 0 && (
                    <TripsEmptyState variant="filtered" />
                )}

                {!loading && !error && filteredTrips.length > 0 && (
                    <TripCard trips={filteredTrips} onDelete={remove} showPhase />
                )}
            </div>
        </div>
    );
};
