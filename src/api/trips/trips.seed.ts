import mongoose from "mongoose";
import { TripType } from "./trips.types.js";
import { Trip } from "./trips.model.js";
import db from "../../config/db.js";

const ownerId = new mongoose.Types.ObjectId("69f097ede17de9f307e586bd");

const tripData: Partial<TripType>[] = [
    {
        title: "Viajar a Roma",
        country: "Italia",
        city: "Roma",
        owner: ownerId,
        startDate: new Date("2024-02-13"),
        endDate: new Date("2024-02-18"),
        description: "Visitar el Vaticano",
        visibility: "public",
        status: "pending",
    },
    {
        title: "Escapada a París",
        country: "Francia",
        city: "París",
        owner: ownerId,
        startDate: new Date("2024-03-10"),
        endDate: new Date("2024-03-15"),
        description: "Subir a la Torre Eiffel y pasear por el Sena",
        visibility: "public",
        status: "completed",
    },
    {
        title: "Fin de semana en Lisboa",
        country: "Portugal",
        city: "Lisboa",
        owner: ownerId,
        startDate: new Date("2024-04-15"),
        endDate: new Date("2024-04-17"),
        description: "Descubrir Alfama y probar pasteles de nata",
        visibility: "private",
        status: "pending",
    },
    {
        title: "Viaje a Londres",
        country: "Reino Unido",
        city: "Londres",
        owner: ownerId,
        startDate: new Date("2024-05-22"),
        endDate: new Date("2024-05-25"),
        description: "Visitar el Big Ben y Camden Market",
        visibility: "public",
        status: "pending",
    },
    {
        title: "Aventura en Berlín",
        country: "Alemania",
        city: "Berlín",
        owner: ownerId,
        startDate: new Date("2024-06-10"),
        endDate: new Date("2024-06-15"),
        description: "Ver el Muro de Berlín y museos",
        visibility: "private",
        status: "pending",
    },
];

mongoose
    .connect(db.DB_URL, {family:4})
    .then(async () => {
        const allTrips = await Trip.find();

        if (allTrips.length) {
            console.log("Deleting trips collection...");
            await Trip.collection.drop();
        } else {
            console.log("No existing trips found, creating trips...");
        }
    })
    .catch((error: unknown) => console.log("There was an error when deleting trips.", error))
    .then(async () => {
        await Trip.insertMany(tripData);
        console.log("Trips added successfully!");
    })
    .catch((error: unknown) => console.log("Error adding trips to database", error))
    .finally(() => mongoose.disconnect());
