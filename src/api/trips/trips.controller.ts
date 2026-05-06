import { Request, Response } from "express";
import { Trip } from "./trips.model.js";
import { Itinerary } from "../itinerary/itinerary.model.js";
import { Day } from "../days/days.model.js";
import { Activity } from "../activity/activity.model.js";
import { Comment } from "../comments/comments.model.js";
import { Task } from "../tasks/tasks.model.js";

export const getAllTrips = async (req: Request, res: Response) => {
    try {
        const trips = await Trip.find({ visibility: "public" })
            .populate("owner", "username avatar")
            .populate("itineraries")
            .populate("tasks", "title")
            .populate({
                path: "comments",
                populate: {
                    path: "author",
                    select: "username avatar text",
                },
            })


        return res.json(trips);
    } catch (error: Error | unknown) {
        return res.status(500).json({ error: "Error al obtener los viajes.", message: (error as Error).message });
    }
};

export const getTripsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const trips = await Trip.find({ owner: userId, visibility: "public" })
            .populate("owner", "username avatar")
            .populate("itineraries")
            .populate("tasks")
            .populate("comments", "author text");

        res.json(trips);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Error al obtener los viajes del usuario", message: (error as Error).message });
    }
};

export const getMyTrips = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const trips = await Trip.find({ owner: userId })
            .populate("owner")
            .populate("members")
            .populate("tasks")
            .populate("comments");
        return res.json(trips);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener tus viajes", message: (error as Error).message });
    }
};

export const getOneTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id)
            .populate("owner", "username avatar")
            .populate("members", "username avatar")
            .populate("tasks")
            .populate("comments", "author text");

        if (!trip) {
            return res.status(404).json({ error: "Viaje no encontrado" });
        }

        return res.json(trip);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el viaje", message: (error as Error).message });
    }
};

export const createTrip = async (req: Request, res: Response) => {
    try {
        const tripData = req.body;
        const newTrip = await Trip.create(tripData);
        return res.status(201).json(newTrip);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el viaje", message: (error as Error).message });
    }
};

export const editTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

        if (!trip) {
            return res.status(404).json({ error: "Viaje no encontrado" });
        }

        // Si se ha completado el sueño, notificar a los participantes
        // if (req.body.status === "completed" && dream.participants?.length) {
        //     const notifications = dream.participants
        //         .filter((p) => p.toString() !== dream.owner.toString())
        //         .map((participantId) => ({
        //             recipient: participantId,
        //             sender: dream.owner,
        //             type: "dream_completed",
        //             targetModel: "dreams",
        //             targetId: dream._id,
        //             message: "¡Ha completado un sueño en el que participas!",
        //         }));

        //     if (notifications.length) {
        //         await Notification.insertMany(notifications);
        //     }
        // }

        return res.json(trip);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar el viaje", message: (error as Error).message });
    }
};

export const deleteTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndDelete(id);

        if (!trip) {
            return res.status(404).json({ error: "Viaje no encontrado" });
        }

        await Itinerary.deleteMany({ tripId: id });
        await Day.deleteMany({ tripId: id });
        await Activity.deleteMany({ tripId: id });
        await Task.deleteMany({ tripId: id });
        await Comment.deleteMany({ tripId: id });

        return res.json({ success: true, trip });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el viaje", message: (error as Error).message });
    }
};
