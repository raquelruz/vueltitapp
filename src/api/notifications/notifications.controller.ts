import { Request, Response } from "express";
import { Notification } from "./notifications.model.js";

export const getNotificationByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .populate("sender", "username avatar")
        .populate("recipient", "username avatar")
        .populate("targetId");

        return res.json(notifications)
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener las notificaciones", message: (error as Error).message })
    }
}

export const createNotification = async (req: Request, res: Response) => {
    try {
        const newNotification = await Notification.create(req.body);
        return res.status(201).json(newNotification)
    } catch (error) {
        return res.status(500).json({ error: "Error al crear la notificación", message: (error as Error).message })
    }
}

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true })
    
        if (!notification) {
            return res.status(404).json({ error: "Notificación no encontrada "})
        }

        return res.json(notification)
    } catch (error) {
        return res.status(500).json({ error: "Error al marcar como leída", message: (error as Error).message })
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({ error: "Notificación no encontrada"});
        }

        return res.json({ success: true, notification });
    } catch (error) {
        return res.status(500).json({ error: "Error al borrar la notificación", message: (error as Error).message })
    }
}