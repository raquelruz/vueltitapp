import { Types } from "mongoose";

export type UserType = {
    id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    avatar?: string;
    bio?: string;
    languages?: string;
    isPublic: boolean;
};
