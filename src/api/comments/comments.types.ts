import { Types } from "mongoose";

export type CommentType = {
    _id: Types.ObjectId;
    dreamId: Types.ObjectId;
    author: Types.ObjectId;
    text: string;
    parentComment?: Types.ObjectId;
};
