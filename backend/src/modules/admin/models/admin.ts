/* eslint-disable prettier/prettier */
import { model, Schema, Document } from "mongoose";
import { Admin, AdminRole } from "../types";

const userSchema: Schema = new Schema<Admin>({
    userId: { type: Schema.Types.String, required: true, unique: true, index: true },
    password: { type: Schema.Types.String, required: true },
    userName: { type: Schema.Types.String, required: true, unique: true },
    email: { type: Schema.Types.String, index: true },
    name: { type: Schema.Types.String },
    avatar: { type: Schema.Types.String },
    role: { type: Schema.Types.String, enum: Object.values(AdminRole), default: AdminRole.Superadmin },
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' }, // Add wallet reference
    stellarWallet: { type: Schema.Types.ObjectId, ref: 'StellarWallet' },
    token: { type: Schema.Types.String },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
});

const adminModel = model<Admin & Document>("Admin", userSchema, "admin");
export default adminModel;
