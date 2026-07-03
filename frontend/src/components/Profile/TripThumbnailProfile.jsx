export const TripThumbnailProfile = ({ trip }) => {
    if (trip.image) {
        return <img src={trip.image} alt={trip.title} className="h-24 w-full object-cover" />;
    }

    return (
        <div className="h-24 bg-linear-to-br from-primary-300 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
            {trip.title?.[0]?.toUpperCase()}
        </div>
    );
};