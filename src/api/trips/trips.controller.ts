import { Request, Response } from "express";
import { Trip } from "./trips.model.js";
import { Itinerary } from "../itinerary/itinerary.model.js";
import { Day } from "../days/days.model.js";
import { Activity } from "../activity/activity.model.js";
import { Comment } from "../comments/comments.model.js";
import { Task } from "../tasks/tasks.model.js";
import { Notification } from "../notifications/notifications.model.js";
import { sendError, sendSuccess } from "../../utils/response.utils.js";

export const getTrips = async (req: Request, res: Response) => {
    try {
        const trips = await Trip.find({ visibility: "public" });

        console.log("🔥 TRIPS SIN FILTRO:", trips.length);

        return res.json(trips); // 👈 IMPORTANTE: sin wrapper
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "error" });
    }
};

export const getTripsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const trips = await Trip.find({ owner: userId, visibility: "public" })
            .populate("owner", "username avatar")
            .populate("itineraries", "title description")
            .populate("tasks", "title isCompleted assignedTo")
            .populate("comments", "author text");

        return sendSuccess(res, trips);
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};

export const getMyTrips = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const trips = await Trip.find({ owner: userId })
            .populate("owner", "username avatar")
            .populate("members", "username avatar")
            .populate("tasks", "title isCompleted assignedTo")
            .populate("comments", "author text");

        return sendSuccess(res, trips);
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};

export const getOneTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id)
            .populate("owner", "username avatar")
            .populate("members", "username avatar")
            .populate("tasks", "title isCompleted assignedTo")
            .populate("comments", "author text");

        if (!trip) {
            return sendError(res, "Trip no encontrado", 404);
        }

        return sendSuccess(res, trip);
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};

export const createTrip = async (req: Request, res: Response) => {
    try {
        const tripData = req.body;
        const newTrip = await Trip.create(tripData);

        return sendSuccess(res, newTrip, "Viaje creado", 201);
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};

export const editTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const trip = await Trip.findByIdAndUpdate(id, req.body, {
            returnDocument: "after",
        });

        if (!trip) {
            return sendError(res, "Viaje no encontrado", 404);
        }

        // NOTIFICACIÓN: viaje completado
        if (req.body.status === "completed" && trip.members?.length) {
            const notifications = trip.members
                .filter((member) => member.toString() !== trip.owner.toString())
                .map((memberId) => ({
                    recipient: memberId,
                    sender: trip.owner,
                    type: "trip_completed",
                    targetModel: "trips",
                    targetId: trip._id,
                    message: "¡Se ha completado un viaje en el que participas!",
                    isRead: false,
                }));

            if (notifications.length) {
                await Notification.insertMany(notifications);
            }
        }

        return sendSuccess(res, trip);
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};

export const deleteTrip = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByIdAndDelete(id);

        if (!trip) {
            return sendError(res, "Viaje no encontrado", 404);
        }

        await Itinerary.deleteMany({ tripId: id });
        await Day.deleteMany({ tripId: id });
        await Activity.deleteMany({ tripId: id });
        await Task.deleteMany({ tripId: id });
        await Comment.deleteMany({ targetId: id });

        return sendSuccess(res, trip);
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};
