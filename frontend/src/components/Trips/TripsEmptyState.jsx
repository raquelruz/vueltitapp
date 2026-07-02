import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";

export const TripsEmptyState = ({ variant = "none" }) => {
    if (variant === "filtered") {
        return (
            <div className="text-center py-16 px-4">
                <p className="text-text-secondary">No tienes viajes en esta categoría todavía.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center py-20 px-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10 text-primary text-2xl mb-4">
                <MdCardTravel />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">Todavía no tienes viajes</h3>
            <p className="text-sm text-text-primary max-w-sm mb-6">
                Cuando organices tu primer viaje, aparecerá aquí con su destino, fechas y compañeros de ruta.
            </p>
            <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-linear-to-r from-primary-600 to-primary-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
                <FaPlus className="text-xs" />
                Explorar destinos
            </Link>
        </div>
    );
};
