import { Request, Response } from "express"
import { Comment } from "./comments.model.js";
import { Trip } from "../trips/trips.model.js";
import { Notification } from "../notifications/notifications.model.js";
import { Activity } from "../activity/activity.model.js";


export const getCommentsByTrip = async (req: Request, res: Response) => {
    try {
        const { tripId } = req.params;
        const comments = await Comment.find({ tripId })
            .populate("author", "username avatar")
            .populate({ path: "parentComment", populate: { path: "author" } });
        return res.json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los comentarios", message: (error as Error).message })
    }
}

export const getCommentsByActivity = async (req: Request, res: Response) => {
    try {
        const { activityId } = req.params;
        const comments = await Comment.find({ activityId })
            .populate("author", "username avatar")
            .populate({ path: "parentComment", populate: { path: "author", select: "" } });
        return res.json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los comentarios", message: (error as Error).message })
    }
}


export const createComment = async (req: Request, res: Response) => {
    try {
        const newComment = await Comment.create(req.body);

        let ownerId = null;

        // COMENTARIO EN VIAJE
        if (newComment.targetModel === "trips") {
            const trip = await Trip.findById(newComment.targetId);

            if (trip) {
                ownerId = trip.owner;
            }
        }

        // COMENTARIO EN ACTIVIDAD
        if (newComment.targetModel === "activities") {
            const activity = await Activity.findById(newComment.targetId)
                .populate("createdBy");

            if (activity) {
                ownerId = activity.createdBy;
            }
        }

        // NOTIFICACIÓN
        if (
            ownerId &&
            ownerId.toString() !== newComment.author.toString()
        ) {
            await Notification.create({
                recipient: ownerId,
                sender: newComment.author,
                type: "new_comment",
                targetModel: newComment.targetModel,
                targetId: newComment.targetId,
                message: "Ha comentado en tu publicación"
            });
        }

        return res.status(201).json(newComment);

    } catch (error) {
        return res.status(500).json({
            error: "Error al crear el comentario",
            message: (error as Error).message
        });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(400).json({ error: "Comentario no encontrado" })
        }

        await Comment.deleteMany({ parentComment: id });

        return res.json({ success: true, comment });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el comentario", message: (error as Error).message })
    }
}