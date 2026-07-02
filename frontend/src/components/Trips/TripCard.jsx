import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { getStampInfo } from "../../utils/tripPhase";

const stampTone = {
    upcoming: "border-info text-info bg-info/10",
    ongoing: "border-success text-success bg-success/10",
    completed: "border-text-muted text-text-muted bg-text-muted/10",
    pendingClose: "border-warning text-warning bg-warning/10",
};

export const TripCard = ({ trips, onDelete, showPhase = false }) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-12 px-4">
            {trips.map((trip) => {
                const stamp = showPhase ? getStampInfo(trip) : null;
                const canDelete = onDelete && user && trip.owner?.id === user.id;

                return (
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

                            {/* SELLO DE FASE (solo cuando showPhase=true, p.ej. en Mis Viajes) */}
                            {showPhase && (
                                <div
                                    className={`absolute top-4 left-4 w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center backdrop-blur-sm -rotate-12 ${stampTone[stamp.tone]}`}
                                >
                                    <span className="text-[9px] font-bold uppercase tracking-wider leading-tight text-center px-1">
                                        {stamp.label}
                                    </span>
                                </div>
                            )}

                            {/* BOTÓN ELIMINAR — solo visible al hacer hover */}
                            {canDelete && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(trip.id);
                                    }}
                                    className="absolute top-4 left-4 bg-error/90 hover:bg-error backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                                    title="Eliminar viaje"
                                >
                                    ✕ Eliminar
                                </button>
                            )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-text group-hover:text-primary-500 transition">
                                {trip.title}
                            </h3>

                            <p className="text-sm text-text-secondary mt-1">
                                📍 {trip.city}, {trip.country}
                            </p>

                            {/* CTA */}
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xs text-text-muted">Plan de viaje</span>

                                <button className="text-sm font-medium text-primary-500 hover:text-color-primary-hover transition">
                                    Ver detalles →
                                </button>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};