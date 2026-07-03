export const TripsGallery = ({ trips }) => {
    const tripsWithImage = trips.filter((trip) => trip.image);

    if (tripsWithImage.length === 0) {
        return <p className="text-gray-400 text-sm">Aún no has subido fotos de tus viajes.</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tripsWithImage.map((trip) => (
                <img
                    key={trip.id}
                    src={trip.image}
                    alt={trip.title}
                    className="h-32 w-full object-cover rounded-xl hover:opacity-90 transition cursor-pointer"
                />
            ))}
        </div>
    );
};