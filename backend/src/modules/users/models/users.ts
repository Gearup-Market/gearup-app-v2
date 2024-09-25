/* eslint-disable prettier/prettier */
import { model, Schema, Document } from "mongoose";
import { User } from "../types";

const userSchema: Schema = new Schema<User>({
    userId: { type: Schema.Types.String, required: true, unique: true, index: true },
    email: { type: Schema.Types.String, required: true, trim: true, index: true },
    password: { type: Schema.Types.String, required: true },
    userName: { type: Schema.Types.String, required: true },
    phoneNumber: { type: Schema.Types.String },
    firstName: { type: Schema.Types.String },
    lastName: { type: Schema.Types.String },
    address: { type: Schema.Types.String },
    about: { type: Schema.Types.String },
    facebook: { type: Schema.Types.String },
    linkedin: { type: Schema.Types.String },
    instagram: { type: Schema.Types.String },
    twitter: { type: Schema.Types.String },
    avatar: { type: Schema.Types.String },
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' }, // Add wallet reference
    stellarWallet: { type: Schema.Types.ObjectId, ref: 'StellarWallet' },
    accountName: { type: Schema.Types.String },
	accountNumber: { type: Schema.Types.String, index: true },
	bankName: { type: Schema.Types.String },
    isVerified: { type: Schema.Types.Boolean },
    token: { type: Schema.Types.String },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
});

const userModel = model<User & Document>("User", userSchema, "users");
export default userModel;
