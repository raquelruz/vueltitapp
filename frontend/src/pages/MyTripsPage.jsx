import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export const MyTripsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        api.get(`/users/${id}`).then((res) => setUser(res.data));
        api.get(`/trips/my-trips/${id}`).then((res) => setTrips(res.data));
    }, [id]);


    // if (!user) return <p className="text-error-400">Cargando...</p>

    return (
        <div className="py-6 px-4 md:px-8">
            <div className="mb-8 inline-block">
                <div className="px-8 py-2 rounded-full border border-border bg-white/10 backdrop-blur-md">
                    <Link to="/" className="text-sm font-semibold text-primary-500">
                        ← Volver a usuarios
                    </Link>
                </div>
            </div>
        </div>
    );
};
