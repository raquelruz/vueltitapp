const Stat = ({ value, label }) => {
    return (
        <div className="text-center sm:text-left">
            <div className="text-lg font-medium text-primary-500">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
        </div>
    );
};

export const ProfileStats = ({ trips }) => {
    const countriesVisited = new Set(trips.map((trip) => trip.country).filter(Boolean)).size;

    return (
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <Stat value={trips.length} label="Viajes creados" />
            <Stat value={countriesVisited} label="Países visitados" />
            <Stat value="—" label="Actividades" />
        </div>
    );
};
