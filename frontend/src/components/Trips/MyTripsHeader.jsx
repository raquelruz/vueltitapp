import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaSuitcaseRolling, FaCalendarAlt } from "react-icons/fa";

const getTierLabel = (tripCount) => {
    if (tripCount === 0) return "Nuevo pasajero";
    if (tripCount < 3) return "Viajero";
    return "Viajero frecuente";
};

const StatChip = ({ icon, value, label }) => (
    <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-600) 8%, transparent)" }}
    >
        <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-bg-card"
            style={{ color: "var(--color-primary-500)" }}
        >
            {icon}
        </div>
        <div>
            <p className="text-lg font-bold text-text leading-none">{value}</p>
            <p className="text-[11px] text-text-muted mt-1">{label}</p>
        </div>
    </div>
);

export const MyTripsHeader = ({ user, tripCount, destinationCount, totalDays, loading }) => {
    const [mounted, setMounted] = useState(false);
    const displayName = user?.name ? `${user.name} ${user.surname || ""}`.trim() : "Viajero/a";

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                {/* NOMBRE */}
                <div className="shrink-0">
                    <span
                        className="inline-block text-[10px] text-text-secondary/60 py-1 rounded-full font-semibold uppercase tracking-widest"                    >
                        {loading ? "…" : getTierLabel(tripCount)}
                    </span>
                    <h2 className="font-title text-xl sm:text-2xl font-bold text-text leading-tight whitespace-nowrap">
                        {loading ? "Cargando…" : displayName}
                    </h2>
                </div>

                {/* ESTADÍSTICAS */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <StatChip
                        icon={<FaSuitcaseRolling className="text-sm" />}
                        value={loading ? "—" : tripCount}
                        label="Viajes"
                    />
                    <StatChip
                        icon={<FaMapMarkerAlt className="text-sm" />}
                        value={loading ? "—" : destinationCount}
                        label="Destinos"
                    />
                    <StatChip
                        icon={<FaCalendarAlt className="text-sm" />}
                        value={loading ? "—" : totalDays}
                        label="Días de viaje"
                    />
                </div>
            </div>
        </div>
    );
};
