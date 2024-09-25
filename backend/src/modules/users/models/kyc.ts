/* eslint-disable prettier/prettier */
import { model, Schema, Document } from "mongoose";
import { Kyc } from "../types";

const kycSchema: Schema = new Schema<Kyc>({
	userId: { type: Schema.Types.String, ref: "User", required: true, unique: true },
	firstName: { type: Schema.Types.String, required: true, trim: true},
	lastName: { type: Schema.Types.String, required: true, trim: true },
	birthday: { type: Schema.Types.String, required: true },
	bvn: { type: Schema.Types.String },
	phoneNumber: { type: Schema.Types.String, trim: true, index: true  },
    country: {type: Schema.Types.String, required: true},
    address: {type: Schema.Types.String, required: true},
    city: {type: Schema.Types.String, required: true},
    postalCode: {type: Schema.Types.String},
	documentType: {
        type: Schema.Types.String,
		enum: ["intl_passport", "driver_license", "national_id", "voters_card", "nin"],
	},
	documentPhoto: {
        type: [Schema.Types.String],
	},
    isPhoneNumberVerified: { type: Schema.Types.Boolean, default: false },
    isSubmitted: {type: Schema.Types.Boolean, default: false},
	isApproved: { type: Schema.Types.Boolean, default: false },
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

const kycModel = model<Kyc & Document>("Kyc", kycSchema, "kyc");

export default kycModel;
