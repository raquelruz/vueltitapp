import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { HeroSection } from "../sections/HeroSection";
import api from "../api";
import { TripCard } from "../components/TripCard";

export const HomePage = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        api.get("/trips").then((res) => {
            setTrips(res.data.trips);
        });
    }, []);

    return (
        <>

        <Navbar />
        <HeroSection />

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
            ))}
        </div>
        </>
    );
};