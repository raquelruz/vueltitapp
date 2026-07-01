export const TRIP_PHASES = {
    upcoming: { label: "Próximos" },
    ongoing: { label: "En curso" },
    past: { label: "Finalizados" },
};

// Fase temporal (para agrupar en las pestañas)
export const getTripPhase = (trip) => {
    const now = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);

    if (now < start) return "upcoming";
    if (now > end) return "past";
    return "ongoing";
};

// Combina la fecha con el campo real 'status' del backend.
// Un viaje ya terminado por fecha puede seguir "pending" si el owner no lo cerró.
export const getStampInfo = (trip) => {
    const phase = getTripPhase(trip);

    if (phase === "upcoming") return { label: "Próximo", tone: "upcoming" };
    if (phase === "ongoing") return { label: "En curso", tone: "ongoing" };

    return trip.status === "completed"
        ? { label: "Finalizado", tone: "completed" }
        : { label: "Pendiente de cerrar", tone: "pendingClose" };
};