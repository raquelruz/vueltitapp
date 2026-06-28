import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const TripCard = ({ trips, onDelete }) => {
    const { user } = useAuth();

    if (!Array.isArray(trips) || trips.length === 0) {
        return (
            <div className="text-center mt-16 text-white/80">
                <p className="text-lg">No hay viajes disponibles</p>
                <p className="text-sm opacity-70">Prueba a buscar otro destino ✈️</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12 px-4">
            {trips.map((trip) => (
                <Link
                    key={trip.id}
                    to={`/trips/${trip.id}`}
                    className="group relative bg-bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                    {/* IMAGE SECTION */}
                    <div className="relative h-52 overflow-hidden bg-linear-to-br from-gray-300 to-gray-200">
                        {trip.image && (
                            <img
                                src={trip.image}
                                alt={trip.city}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        )}

                        {!trip.image && (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-bg-soft to-bg-card">
                                <svg
                                    className="w-16 h-16 text-text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                        <div className="absolute top-4 right-4 bg-bg-primary backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-text">
                            ✈️ {trip.city}
                        </div>

                        <div className="absolute bottom-4 left-4 bg-bg-card backdrop-blur px-3 py-1 rounded-full text-xs text-text">
                            {new Date(trip.startDate).toLocaleDateString()} →{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                        </div>

                        {/* BOTÓN ELIMINAR */}
                        {onDelete && user && trip.owner?.id === user.id && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(trip.id);
                                }}
                                className="absolute top-4 left-4 bg-red-500/90 hover:bg-red-600 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white transition-colors"
                                title="Eliminar viaje"
                            >
                                ✕ Eliminar
                            </button>
                        )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                            {trip.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            📍 {trip.city}, {trip.country}
                        </p>

                        {/* CTA */}
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-gray-400">Plan de viaje</span>

                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                                Ver detalles →
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
