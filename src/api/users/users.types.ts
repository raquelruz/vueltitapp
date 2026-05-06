import { Types } from "mongoose"

export type UserType = {
    id: Types.ObjectId;
    username: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    languages?: string;
    isPublic: boolean;
}