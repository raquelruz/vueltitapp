import { Request, Response } from "express";
import { Day } from "./days.model.js";
import { Activity } from "../activity/activity.model.js";

export const getDaysByItinerary = async (req: Request, res: Response) => {
    try {
        const { itineraryId } = req.params;

        const days = await Day.find({ itineraryId })
            .populate("itineraryId", "title description")
            .populate("activities")   
            .sort("order");

        return res.json(days);

    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener los días del itinerario",
            message: (error as Error).message,
        });
    }
};

export const createDay = async (req: Request, res: Response) => {
    try {
        const newDay = await Day.create(req.body);

        return res.status(201).json(newDay);

    } catch (error) {
        return res.status(500).json({
            error: "Error al crear el día",
            message: (error as Error).message,
        });
    }
};

export const editDay = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const day = await Day.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!day) {
            return res.status(404).json({
                error: "Día no encontrado",
            });
        }

        return res.json(day);

    } catch (error) {
        return res.status(500).json({
            error: "Error al editar el día",
            message: (error as Error).message,
        });
    }
};

export const deleteDay = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const day = await Day.findByIdAndDelete(id);

        if (!day) {
            return res.status(404).json({
                error: "Día no encontrado",
            });
        }

        return res.json({ success: true, day });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar el día",
            message: (error as Error).message,
        });
    }
};