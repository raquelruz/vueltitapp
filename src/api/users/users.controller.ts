import { Request, Response } from "express";
import { User } from "./users.model.js";
import { Trip } from "../trips/trips.model.js";
import { Task } from "../tasks/tasks.model.js";
import { Comment } from "../comments/comments.model.js";

export const getRegister = (req: Request, res: Response) => {
    return res.json("Ruta /register funcionando");
};

export const getLogin = (req: Request, res: Response) => {
    return res.json("Ruta /login funcionando");
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("name username email"); // En caso de tener select: true en el modelo, como lo tenemos y aún asi querer la contraseña
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los usuarios", message: (error as Error).message });
    }
};

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el usuario", message: (error as Error).message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el usuario", message: (error as Error).message });
    }
};


export const editUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar el usuario", message: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Cascade
        const userTrips = await Trip.find({ owner: id }).select("_id");
        const tripIds = userTrips.map((trip) => trip._id);

        await Task.deleteMany({ tripId: { $in: tripIds }});
        await Comment.deleteMany({ tripId: { $in: tripIds }});

        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el usuario", message: (error as Error).message });
    }
};
