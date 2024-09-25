/* eslint-disable prettier/prettier */
import { model, Schema } from "mongoose";
import { PaymentMethod, WTransaction, WTransactionStatus, WTransactionType } from "../types";

const transactionSchema: Schema = new Schema<WTransaction>({
	userId: { type: Schema.Types.String, ref: "User", required: true },
	amount: { type: Schema.Types.Number, required: true },
	type: { type: Schema.Types.String, enum: Object.values(WTransactionType), required: true, index: true },
	description: { type: Schema.Types.String },
	reference: { type: Schema.Types.String },
	status: { type: Schema.Types.String, enum: Object.values(WTransactionStatus), index: true, default: WTransactionStatus.Pending },
	method: { type: Schema.Types.String, enum: Object.values(PaymentMethod) },
	createdAt: { type: Schema.Types.Date, default: Date.now },
	updatedAt: { type: Schema.Types.Date },
});

const transactionModel = model<WTransaction>("WalletTransaction", transactionSchema, 'walletTransactions');

export default transactionModel;
