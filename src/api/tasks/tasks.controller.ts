import { Request, Response } from "express";
import { Task } from "./tasks.model.js";
import { Trip } from "../trips/trips.model.js";
import { Notification } from "../notifications/notifications.model.js";

export const getTasksByTrip = async (req: Request, res: Response) => {
    try {
        const { tripId } = req.params;
        const tasks = await Task.find({ tripId }).populate("assignedTo", "username avatar").sort("order");
        return res.json(tasks);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener las tareas", message: (error as Error).message });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const newTask = await Task.create(req.body);
        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear la tarea", message: (error as Error).message });
    }
};

export const toggleTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        // Si se acaba de completar, notificar al dueño del sueño
        if (task.isCompleted && task.assignedTo) {
            const trip = await Trip.findById(task.tripId);

            if (!trip) return;

            if (trip.owner && task.assignedTo.toString() !== trip.owner.toString()) {
                await Notification.create({
                    recipient: trip.owner,
                    sender: task.assignedTo,
                    type: "task_completed",
                    targetModel: "Task",
                    targetId: task._id,
                    message: "Ha completado una tarea",
                });
            }
        }

        return res.json(task);
    } catch (error) {
        return res.status(500).json({ error: "Error al alternar la tarea", message: (error as Error).message });
    }
};

export const editTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        return res.json(task);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar la tarea", message: (error as Error).message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        return res.json({ success: true, task });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar la tarea", message: (error as Error).message });
    }
};
