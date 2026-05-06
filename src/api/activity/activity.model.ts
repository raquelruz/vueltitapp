import mongoose, { Schema } from "mongoose";
import { ActivityType } from "./activity.types.js";

const activitySchema = new Schema(
    {
        dayId: {
            type: Schema.Types.ObjectId,
            ref: "days",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },

        date: {
            type: Date,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            default: "",
        },

        maxParticipants: {
            type: Number,
            default: 0,
        },

        price: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["active", "cancelled", "completed"],
            default: "active",
        }
    },
    {
        timestamps: true,
    }
);

activitySchema.virtual("members", {
    ref: "members",
    localField: "_id",
    foreignField: "memberId"
});

activitySchema.virtual("comments", {
    ref: "comments",
    localField: "_id",
    foreignField: "targetId",
    match: {
        targetModel: "trips"
    }
});

export const Activity = mongoose.model<ActivityType>("activities", activitySchema);