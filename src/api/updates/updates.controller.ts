import { Request, Response } from "express";
import { Update } from "./updates.model.js";
import { Trip } from "../trips/trips.model.js";
import { Notification } from "../notifications/notifications.model.js";

export const getUpdatesByTrip = async (req: Request, res: Response) => {
    try {
        console.log("HOLA")
        const { tripId } = req.params;
        const updates = await Update.find({ tripId })
        .sort({ createdAt: -1 });
        return res.json(updates);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener las actualizaciones del viaje", message: (error as Error).message })
    }
};

export const createUpdate = async (req: Request, res: Response) => {
    try {
        const newUpdate = await Update.create(req.body);

        const trip = await Trip.findById(newUpdate.tripId).lean();
        if (trip && trip.owner.toString() !== newUpdate.userId.toString()) {
            await Notification.create({
                recipient: trip.owner,
                sender: newUpdate.userId,
                type: "new_update",
                targetModel: "updates",
                targetId: newUpdate._id,
                message: "Ha publicado una actualización en tu viaje"
            })
        };

        return res.status(201).json(newUpdate);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear la actualización", message: (error as Error).message })
    }
}