import { NextFunction, Request, Response } from "express";
import { TripType } from "./trips.types.js";
import { sendError } from "../../utils/response.utils.js";

interface CustomRequestTrips extends Request {
    requestInfo?: {
        timestamp: string;
        method: string;
        url: string;
    };
}

export const addRequestInfo = (req: CustomRequestTrips, res: Response, next: NextFunction) => {
    console.log("Middleware 1 - addRequestInfo");

    req.requestInfo = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
    };

    next();
};

export const logRequestInfo = (req: CustomRequestTrips, res: Response, next: NextFunction) => {
    console.log("Middleware 2 - logRequestInfo");

    console.log("Método:", req.requestInfo?.method);
    console.log("URL:", req.requestInfo?.url);
    console.log("Timestamp:", req.requestInfo?.timestamp);

    next();
};

export const validateTrip = (req: Request, res: Response, next: NextFunction) => {
    const { title, owner, country, city, startDate, endDate } = req.body as TripType;

    if (!title || title.length < 3) {
        return sendError(res, "El título del viaje debe contener al menos 3 caracteres", 400);
    }

    if (!owner) {
        return sendError(res, "No se ha podido identificar quién organiza este viaje", 400);
    }

    if (!country) {
        return sendError(res, "Debes seleccionar un país de destino", 400);
    }

    if (!city) {
        return sendError(res, "Debes seleccionar una ciudad de destino", 400);
    }

    if (!startDate) {
        return sendError(res, "Debes indicar la fecha de inicio del viaje", 400);
    }

    if (!endDate) {
        return sendError(res, "Debes indicar la fecha final del viaje", 400);
    }

    if (new Date(startDate) > new Date(endDate)) {
        return sendError(res, "La fecha de inicio debe ser anterior a la fecha de final", 400);
    }

    return next();
};
