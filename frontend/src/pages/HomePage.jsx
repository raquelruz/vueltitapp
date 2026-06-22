import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../sections/HeroSection";
import api from "../api";
import { TripsList } from "../components/TripsList";

export const HomePage = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
    api.get("/trips")
        .then((res) => {
            console.log("FULL RES 👉", res);
            console.log("TRIPS 👉", res.data); // 👈 ESTO ES LO CORRECTO

            setTrips(res.data || []);
        })
        .catch((err) => {
            console.log("ERROR 👉", err);
        });
}, []);

    return (
        <>
            <Navbar />
            <HeroSection />
            <TripsList trips={trips} />
        </>
    );
};