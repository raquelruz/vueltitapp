import { useEffect, useState } from "react";
import api from "../api";
import { TripsList } from "../components/TripsList";

export const ExplorePage = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        api.get("/trips").then((res) => {
            setTrips(res.data); // 👈 interceptor ya lo deja limpio
        });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Explorar viajes 🌍
            </h1>

            <TripsList trips={trips} />
        </div>
    );
};