import { Types } from "mongoose";

export type TripType = {
    _id: Types.ObjectId;
    title: string;
    country: string;
    city: string;
    owner: Types.ObjectId;
    members: Types.ObjectId[];
    itineraries: Types.ObjectId[];
    startDate: Date;
    endDate: Date;
    description: string;
    visibility: "public" | "private";
    status: "pending" | "completed";
};