import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { CreateTripForm } from "../components/Trips/CreateTripForm";
import { TripCard } from "../components/Trips/TripCard";
import { ExploreHeader } from "../components/ExploreHeader";
import { useAuth } from "../auth/AuthContext";

export const ExplorePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const date = searchParams.get("date") || "";

    // Cargar viajes con búsqueda y filtros
    const loadTrips = async () => {
        setLoading(true);

        try {
            const response = await api.get("/trips", {
                params: { search, date },
            });

            const publicTrips = (response.data || []).filter((trip) => trip.visibility === "public");

            setTrips(publicTrips);
        } catch (error) {
            console.error("Error cargando viajes:", error);
            setTrips([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrips();
    }, [search, date]);

    // Eliminar viaje
    const remove = async (id) => {
        if (!confirm("¿Eliminar este viaje? Se borrarán también sus tareas, comentarios y updates.")) {
            return;
        }

        try {
            await api.delete(`/trips/${id}`);
            loadTrips();
        } catch (error) {
            alert(error.message || "Error al eliminar el viaje");
        }
    };

    if (loading) return <p className="text-gray-500">Cargando viajes...</p>;

    return (
        <div className="min-h-screen bg-bg-primary">
            <ExploreHeader />

            <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="mb-6 flex justify-between items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {trips.length} viajes encontrados
                    </div>

                    {user && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className={`px-6 py-2 rounded-lg text-sm font-medium duration-200 ${
                                showForm
                                    ? "bg-error-500 hover:bg-error-600 text-white"
                                    : "bg-primary-500 hover:bg-color-primary-hover text-white"
                            }`}
                        >
                            {showForm ? "✕ Cancelar" : "+ Nuevo viaje"}
                        </button>
                    )}

                    {!user && (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-color-primary hover:bg-color-primary-hover text-text-primary px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                            Inicia sesión
                        </button>
                    )}
                </div>

                {user && showForm && (
                    <CreateTripForm
                        onSuccess={() => {
                            setShowForm(false);
                            loadTrips();
                        }}
                    />
                )}

                {trips.length === 0 && (
                    <p className="text-text-secondary text-center py-12">No hay viajes públicos todavía.</p>
                )}

                {trips.length > 0 && <TripCard trips={trips} onDelete={remove} />}
            </div>
        </div>
    );
};
