import { Types } from 'mongoose';

export type Admin = {
    _id: Types.ObjectId;
    userId: string;
    name: string;
    email: string;
    userName: string;
    password: string;
    avatar: string;
    token?: string;
    wallet: Types.ObjectId;
    stellarWallet: Types.ObjectId;
    role: AdminRole;
    createdAt?: Date;
    updatedAt?: Date;
};

export enum AdminRole {
    Superadmin = 'superadmin',
    Support = 'support'
}

export type UserId = string;