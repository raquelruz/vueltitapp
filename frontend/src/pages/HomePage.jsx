import { useEffect, useState } from "react";
import { HeroSection } from "../sections/HeroSection";
import api from "../api";

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
            <HeroSection />
        </>
    );
};