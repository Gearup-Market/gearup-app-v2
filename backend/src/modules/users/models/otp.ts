/* eslint-disable prettier/prettier */
import { model, Schema, Document } from "mongoose";
import { Otp, OtpType } from "../types";

const otpSchema: Schema = new Schema<Otp>({
	userId: { type: Schema.Types.String, ref: "User", required: true, index: true},
	code: { type: Schema.Types.String, required: true, trim: true, index: true },
	expiresAt: { type: Schema.Types.Date, required: true },
	otpType: { type: Schema.Types.String, enum: Object.values(OtpType), required: true },
	generatedFor: { type: Schema.Types.String, required: true, trim: true, index: true },
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

const otpModel = model<Otp & Document>("Otp", otpSchema, "otp");
export default otpModel;
