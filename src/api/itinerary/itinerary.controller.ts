import { Request, Response } from "express";
import { Itinerary } from "./itinerary.model.js";
import { Day } from "../days/days.model.js";
import { Activity } from "../activity/activity.model.js";

export const getItinerariesByTrip = async (req: Request, res: Response) => {
    try {
        const { tripId } = req.params;
        const itineraries = await Itinerary.find({ tripId })
        .populate("days", "date")
        .sort("order");
        return res.json(itineraries)
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los itinerarios.", message: (error as Error).message });
    }
}

export const createItinerary = async (req: Request, res: Response) => {
    try {
        const { tripId } = req.params;
        const newItinerary = await Itinerary.create({
            tripId,
            ...req.body
        });

        return res.status(201).json(newItinerary);
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear el itinerario",
            message: (error as Error).message
        });
    }
};

export const editItinerary = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!itinerary) {
            return res.status(404).json({ error: "Itinerario no encontrado" });
        }

        return res.json(itinerary);

    } catch (error) {
        return res.status(500).json({
            error: "Error al editar el itinerario",
            message: (error as Error).message
        });
    }
};

export const deleteItinerary = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const itinerary = await Itinerary.findByIdAndDelete(id);

        if (!itinerary) {
            return res.status(404).json({ error: "Itinerario no encontrado" });
        }

        return res.json({ success: true, itinerary });

    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar el itinerario",
            message: (error as Error).message
        });
    }
};