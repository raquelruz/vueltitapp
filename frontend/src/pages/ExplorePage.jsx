import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import { CreateTripForm } from "../components/CreateTripForm";
import { TripCard } from "../components/TripCard";
import { ExploreHeader } from "../components/ExploreHeader";

export const ExplorePage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        country: "",
        city: "",
        startDate: "",
        endDate: "",
        description: "",
        visibility: "public",
    });
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const date = searchParams.get("date") || "";

    // Cargar viajes con búsqueda y filtros
    const loadTrips = async () => {
        setLoading(true);

        try {
            const res = await api.get("/trips", {
                params: { search, date },
            });

            // Filtrar solo viajes públicos
            const publicTrips = (res.data || []).filter(
                (trip) => trip.visibility === "public"
            );

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

    // Crear nuevo viaje
    const create = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            await api.post("/trips", form);
            setForm({
                title: "",
                country: "",
                city: "",
                startDate: "",
                endDate: "",
                description: "",
                visibility: "public",
            });
            setShowForm(false);
            loadTrips();
        } catch (error) {
            alert(error.message || "Error al crear el viaje");
        } finally {
            setSubmitting(false);
        }
    };

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
            {/* HEADER */}
            <ExploreHeader />

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-8 py-10">
                {/* BOTÓN CREAR */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {trips.length} viajes encontrados
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-hover"
                    >
                        {showForm ? "Cancelar" : "+ Nuevo viaje"}
                    </button>
                </div>

                {/* FORMULARIO CREAR */}
                {showForm && (
                    <CreateTripForm
                        form={form}
                        setForm={setForm}
                        onSubmit={create}
                        submitting={submitting}
                    />
                )}

                {/* LISTA DE VIAJES */}
                {trips.length === 0 ? (
                    <p className="text-gray-400">No hay viajes públicos todavía.</p>
                ) : (
                    <TripCard trips={trips} onDelete={remove} />
                )}
            </div>
        </div>
    );
};