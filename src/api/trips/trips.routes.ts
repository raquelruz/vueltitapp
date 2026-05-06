import { Router } from "express";
import {  getAllTrips, getTripsByUser, getMyTrips,  getOneTrip, createTrip, editTrip, deleteTrip } from "./trips.controller.js";

export const tripRoutes: Router = Router();

tripRoutes.get("/", getAllTrips);

tripRoutes.get("/user/:userId", getTripsByUser);

tripRoutes.get("/my-trips/:userId", getMyTrips);

tripRoutes.get("/:id", getOneTrip);

tripRoutes.post("/", createTrip);

tripRoutes.put("/:id", editTrip);

tripRoutes.delete("/:id", deleteTrip);
