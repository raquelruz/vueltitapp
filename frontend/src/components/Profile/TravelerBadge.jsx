export const TravelerBadge = ({ tripsCount }) => {
    const getLabel = () => {
        if (tripsCount >= 5) return "Viajero frecuente";
        if (tripsCount >= 1) return "Viajero";
        return "Nuevo explorador";
    };

    return (
        <span className="text-xs font-semibold bg-indigo-50 text-primary-500 px-2.5 py-1 rounded-full">
            {getLabel()}
        </span>
    );
};