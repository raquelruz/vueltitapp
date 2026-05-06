import { Request, Response } from "express";
import { Activity } from "./activity.model.js";

export const getActivitiesByDay = async (req: Request, res: Response) => {
    try {
        const { dayId } = req.params;

        const activities = await Activity.find({ dayId })
            .populate("dayId", "title date") 
            // .populate("members", "username avatar")
            .populate("comments", "author text")
            .sort({ time: 1 });

        return res.json(activities);

    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener actividades",
            message: (error as Error).message,
        });
    }
};

export const getActivityById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const activity = await Activity.findById(id)
            .populate("dayId", "title date")
            .populate("members", "username avatar")
            .populate("comments", "author text")

        if (!activity) {
            return res.status(404).json({
                error: "Actividad no encontrada",
            });
        }

        return res.json(activity);

    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener actividad",
        });
    }
};

export const createActivity = async (req: Request, res: Response) => {
    try {
        const { dayId } = req.params;

        const activity = await Activity.create({
            ...req.body,
            dayId,
        });

        return res.status(201).json(activity);

    } catch (error) {
        return res.status(500).json({
            error: "Error al crear actividad",
        });
    }
};

export const editActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true });

        if (!activity) {
            return res.status(404).json({
                error: "Actividad no encontrada",
            });
        }

        return res.json(activity);
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar actividad",
            message: (error as Error).message,
        });
    }
};

export const deleteActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const activity = await Activity.findByIdAndDelete(id);

        if (!activity) {
            return res.status(404).json({
                error: "Actividad no encontrada",
            });
        }

        return res.json({ success: true, activity });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar actividad",
            message: (error as Error).message,
        });
    }
};