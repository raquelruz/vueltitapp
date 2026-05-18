// Express
import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import db from "./config/db.js";

import { tripRoutes } from "./api/trips/trips.routes.js";
import { userRoutes } from "./api/users/users.routes.js";
import { itineraryRoutes } from "./api/itinerary/itinerary.routes.js";
import { dayRoutes } from "./api/days/days.routes.js";
import { activityRoutes } from "./api/activity/activity.routes.js";

import dns from "dns";
import { notificationRoutes } from "./api/notifications/notifications.routes.js";
import { commentRoutes } from "./api/comments/comments.routes.js";
import { taskRoutes } from "./api/tasks/tasks.routes.js";

dns.setDefaultResultOrder("ipv4first");

db.connect();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Coge la petición y la transforma a JSON
app.use(express.json());

// CORS. Decide quién pasa y quien no.
app.use(cors());

// Crea la ruta /
app.get("/", (req: Request, res: Response) => {
    console.log(process.env.MONGO_URI);
    return res.json({ message: "Servidor funcionando correctamente" });
});

app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/days", dayRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/comments", commentRoutes)
app.use("/api/notifications", notificationRoutes)


// Crea el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
