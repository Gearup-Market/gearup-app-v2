/* eslint-disable prettier/prettier */
import { model, Schema } from "mongoose";
import { Wallet, WalletStatus } from "../types";

const walletSchema: Schema = new Schema<Wallet>({
	userId: { type: Schema.Types.String, ref: "User", required: true, unique: true },
	balance: { type: Schema.Types.Number, default: 0, index: true },
	pendingDebit: { type: Schema.Types.Number, default: 0 },
	pendingCredit: { type: Schema.Types.Number, default: 0 },
	currency: { type: Schema.Types.String, default: "NGN" },
	accountName: { type: Schema.Types.String },
	accountNumber: { type: Schema.Types.String, index: true },
	bankName: { type: Schema.Types.String },
	status: {
		type: Schema.Types.String,
		enum: Object.values(WalletStatus),
		default: WalletStatus.Active,
		index: true,
	},
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

const walletModel = model<Wallet>("Wallet", walletSchema);

export default walletModel;
