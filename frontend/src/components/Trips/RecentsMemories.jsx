import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

export const RecentMemories = ({ trips }) => {
    if (trips.length === 0) return null;

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl text-text-primary font-medium">Recuerdos recientes</p>
                <Link to="?filter=past" className="text-sm text-primary-500 hover:underline">
                    Ver todos
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        className="flex items-center gap-3 bg-bg-card border border-border rounded-xl p-3"
                    >
                        <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-14 h-14 rounded-lg object-cover shrink-0 bg-bg-secondary"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-text truncate">{trip.title}</p>
                            <p className="text-xs text-text-tertiary mt-0.5">
                                Finalizado:{" "}
                                {new Date(trip.endDate).toLocaleDateString("es-ES", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        <button
                            type="button"
                            aria-label="Más opciones"
                            className="text-text-muted hover:text-text shrink-0 p-1"
                        >
                            <FaEllipsisV className="text-sm" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};