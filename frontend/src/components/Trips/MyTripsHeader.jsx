import { useEffect, useState } from "react";
import { FaRegCompass } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { TiltCard } from "../ui/TiltCard";

const getTierLabel = (tripCount) => {
    if (tripCount === 0) return "Nuevo pasajero";
    if (tripCount < 3) return "Viajero";
    return "Viajero frecuente";
};

export const MyTripsHeader = ({ user, tripCount, destinationCount, totalDays, loading }) => {
    const [mounted, setMounted] = useState(false);
    const displayName = user?.name ? `${user.name} ${user.surname || ""}`.trim() : "Viajero/a";

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <TiltCard
            maxTilt={3}
            className={`mb-8 rounded-2xl overflow-hidden border border-border shadow-lg transition-all duration-700 ease-out motion-reduce:transition-none ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
        >
            <div className="relative bg-bg-card">
                <div className="relative flex items-center justify-between gap-2 flex-wrap bg-primary-600 text-white pl-8 pr-6 py-3 overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/15 to-transparent"
                    />

                    <div className="relative flex items-center gap-2">
                        <MdFlightTakeoff className="text-lg" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Tarjeta de embarque</span>
                    </div>
                    <span className="relative text-[10px] font-semibold uppercase tracking-widest bg-white/15 px-2.5 py-1 rounded-full">
                        {loading ? "…" : getTierLabel(tripCount)}
                    </span>
                </div>

                <div className="relative flex flex-col sm:flex-row">
                    <div className="relative flex-1 overflow-hidden">
                        <FaRegCompass
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-8 -bottom-12 text-[170px] text-text-primary/8 rotate-12"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute left-0 top-0 bottom-0 w-3 opacity-40"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(90deg, var(--color-text) 0px, var(--color-text) 1px, transparent 1px, transparent 3px)",
                            }}
                        />

                        <div className="relative pl-8 pr-6 py-10 sm:py-10">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
                                <div className="col-span-2">
                                    <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">
                                        Pasajero
                                    </p>
                                    <p className="font-title text-2xl sm:text-3xl leading-tight text-text-primary">
                                        {loading ? "Cargando…" : displayName}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">
                                        Destinos
                                    </p>
                                    <p className="text-xl font-semibold text-text-primary">
                                        {loading ? "—" : destinationCount}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">
                                        Días de viaje
                                    </p>
                                    <p className="text-xl font-semibold text-text-primary">
                                        {loading ? "—" : totalDays}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden sm:block w-px">
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-border" />
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-bg-primary" />
                    </div>

                    <div className="relative bg-primary-500 flex sm:flex-col items-center justify-center gap-2 px-6 sm:px-12 py-8 sm:py-10 border-t sm:border-t-0 border-dashed border-white/20 text-white overflow-hidden">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-white/10 to-transparent"
                        />
                        <MdFlightTakeoff className="relative hidden sm:block text-xl mb-1" />
                        <span className="relative text-xs uppercase tracking-widest text-white/80">Viajes</span>
                        <span className="relative font-title text-5xl leading-none">
                            {loading ? "—" : tripCount}
                        </span>
                    </div>
                </div>
            </div>
        </TiltCard>
    );
};
