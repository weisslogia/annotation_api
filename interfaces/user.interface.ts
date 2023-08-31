import mongoose from "mongoose";

export interface IUserPost {
    name: string;
    username: string;
    password: string;
    profile_picture: string
    role: string
    phone: string
    email: string
}

export interface IUpdateUserPost {
    name: string;
    username: string;
    profile_picture: string
    role: string
    phone: string
    email: string
}

export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    password?: string;
    profile_picture: string
    role: string
    phone: string
    email: string
    created_at: string
    updated_at: string
}