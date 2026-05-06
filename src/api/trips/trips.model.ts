import mongoose, { Schema } from "mongoose";
import { TripType } from "./trips.types.js";

const tripSchema = new Schema(
    {
        title: { type: String, required: [true, "El título es obligatorio."] },

        country: { type: String, required: [true, "El país es obligatorio."] },

        city: { type: String, required: [true, "La ciudad es obligatoria."] },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: [true, "El viaje debe tener un propietario."],
        },

        startDate: { type: Date, required: true },

        endDate: { type: Date, required: true },

        description: {
            type: String,
            default: "",
            minLength: 10,
            maxLength: [2000, "El texto es demasiado largo."],
        },

        visibility: { type: String, enum: ["public", "private"], default: "public" },

        status: { type: String, enum: ["pending", "completed"], default: "pending" },
    },

    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

tripSchema.virtual("itineraries", {
    ref: "itineraries",
    localField: "_id",
    foreignField: "tripId",
    // justOne: true,
});


tripSchema.virtual("members", {
    ref: "members",
    localField: "_id",
    foreignField: "memberId"
});

tripSchema.virtual("comments", {
    ref: "comments",
    localField: "_id",
    foreignField: "targetId",
    match: {
        targetModel: "trips"
    }
});

export const Trip = mongoose.model<TripType>("trips", tripSchema);
