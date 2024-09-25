/* eslint-disable prettier/prettier */
import { Types } from 'mongoose';

export interface Location {
    address?: string;
    city?: string;
    state: string;
    country: string;
    coords: {
        longitude: number;
        latitude: number;
    }
}

export type User = {
    _id: Types.ObjectId;
    userId: string;
    name?: string;
    email: string;
    password: string;
    userName: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    about?: string;
    location?: Location;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    avatar?: string;
    isVerified?: boolean;
    token?: string;
    wallet?: Types.ObjectId;
    stellarWallet?: Types.ObjectId;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Kyc = {
    _id: Types.ObjectId;
    userId: string;
    firstName: string;
    lastName: string;
    birthday: string;
    bvn: string;
    phoneNumber: string;
    isPhoneNumberVerified: boolean;
    country: string;
    address: string;
    city: string;
    postalCode: string;
    documentType: 'intl_passport' | 'driver_license' | 'national_id' | 'voters_card' | 'nin';
    documentPhoto: string[];
    isSubmitted: boolean;
    isApproved: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export enum OtpType {
    ResetPassword = 'reset_password',
    VerifyAccount = 'verify_account',
    VerifyPhoneNumber = 'verify_phone_number'
}

export type Otp = {
    _id: Types.ObjectId;
    userId: string
    code: string;
    expiresAt: Date;
    otpType: OtpType;
    generatedFor: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Session = {
    _id: Types.ObjectId;
    sessionId: string;
    userId: string;
    sessionCount: number;
    lastActivity: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Review = {
    _id: Types.ObjectId;
    reviewer: string;
    reviewed: string;
    transaction: string;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserId = string;