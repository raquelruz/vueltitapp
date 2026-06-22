import { Router } from "express";
import {  getTrips, getTripsByUser, getMyTrips,  getOneTrip, createTrip, editTrip, deleteTrip } from "./trips.controller.js";
import { validateTrip } from "./trips.middlewares.js";

export const tripRoutes: Router = Router();

tripRoutes.get("/", getTrips);

tripRoutes.get("/user/:userId", getTripsByUser);

tripRoutes.get("/my-trips/:userId", getMyTrips);

tripRoutes.get("/:id", getOneTrip);

tripRoutes.post("/", validateTrip, createTrip);

tripRoutes.put("/:id", editTrip);

tripRoutes.delete("/:id", deleteTrip);
