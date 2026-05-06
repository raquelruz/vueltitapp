import { Request, Response } from "express";
import { User } from "./users.model.js";

export const getRegister = (req: Request, res: Response) => {
    return res.json("Ruta /register funcionando");
};

export const getLogin = (req: Request, res: Response) => {
    return res.json("Ruta /login funcionando");
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("+password"); // En caso de tener select: true en el modelo, como lo tenemos y aún asi querer la contraseña
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

// export const deleteUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findByIdAndDelete(id);

//         if (!user) {
//             return res.status(404).json({ error: "Usuario no encontrado" });
//         }

//         // Cascade: borrar los sueños del usuario y sus dependientes
//         const userDreams = await Dream.find({ owner: id }).select("_id");
//         const dreamIds = userDreams.map((d) => d._id);

//         await Task.deleteMany({ dreamId: { $in: dreamIds } });
//         await Comment.deleteMany({ dreamId: { $in: dreamIds } });
//         await Update.deleteMany({ dreamId: { $in: dreamIds } });
//         await Dream.deleteMany({ owner: id });

//         // Borrar colecciones del usuario y desagrupar sus sueños
//         const userCollections = await Collection.find({ owner: id }).select("_id");
//         const collectionIds = userCollections.map((c) => c._id);
//         await Dream.updateMany({ collectionId: { $in: collectionIds } }, { collectionId: null });
//         await Collection.deleteMany({ owner: id });

//         // Borrar tareas asignadas, comentarios y updates del usuario en sueños ajenos
//         await Task.deleteMany({ assignedTo: id });
//         await Comment.deleteMany({ author: id });
//         await Update.deleteMany({ userId: id });

//         return res.json({ success: true, user });
//     } catch (error) {
//         return res.status(500).json({ error: "Error al eliminar el usuario", message: (error as Error).message });
//     }
// };
