export const TripsList = ({ trips }) => {
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
                <div
                    key={trip.id}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                    {/* IMAGE SECTION */}
                    <div className="relative h-52 overflow-hidden">
                        <img
                            src={trip.image}
                            alt={trip.city}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                            ✈️ {trip.city}
                        </div>

                        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                            {new Date(trip.startDate).toLocaleDateString()} →{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                        </div>
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
                </div>
            ))}
        </div>
    );
};
