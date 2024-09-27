import { model, Schema, Model } from "mongoose";
import {
	MetadataSchema,
	ShippingType,
	StageSchema,
	Transaction,
	TransactionStage,
	TransactionStatus,
	TransactionType,
} from "../types";
import { HttpException } from "@/core/exceptions/HttpException";
import { isEmpty } from "@/core/utils";

const stageSchema = new Schema<StageSchema>({
	stage: {
		type: Schema.Types.String,
		enum: Object.values(TransactionStage),
		required: true,
	},
	updatedAt: {
		type: Schema.Types.Date,
		default: Date.now(),
	},
	isCurrent: {
		type: Schema.Types.Boolean,
		default: false,
	},
	transactionHash: {
		type: Schema.Types.String,
		required: false,
	},
});

const metadataSchema = new Schema<MetadataSchema>({
	shippingType: { type: Schema.Types.String, enum: Object.values(ShippingType), default: ShippingType.LocalPickup },
	thirdPartyCheckup: { type: Schema.Types.Boolean, default: false },
	name: { type: Schema.Types.String },
	phoneNumber: { type: Schema.Types.String },
	company: { type: Schema.Types.String },
	address: { type: Schema.Types.String },
	postalCode: { type: Schema.Types.String },
	city: { type: Schema.Types.String },
	country: { type: Schema.Types.String },

})

const transactionSchema = new Schema<Transaction>({
	item: { type: Schema.Types.String, ref: "Listing", required: true, index: true },
	buyer: { type: Schema.Types.String, ref: "User", required: true, index: true },
	seller: { type: Schema.Types.String, ref: "User", required: true, index: true },
	type: {
		type: String,
		enum: Object.values(TransactionType),
		required: true,
		index: true,
	},
	status: {
		type: Schema.Types.String,
		enum: Object.values(TransactionStatus),
		default: TransactionStatus.Pending,
		index: true,
	},
	stages: [stageSchema],
	reviews: {
		buyerReviewed: { type: Schema.Types.Boolean, default: false },
		sellerReviewed: { type: Schema.Types.Boolean, default: false },
	},
	amount: { type: Schema.Types.Number, required: true },
	rentalPeriod: {
		start: { type: Schema.Types.Date },
		end: { type: Schema.Types.Date },
	},
	reference: { type: Schema.Types.String },
	metadata: { type: metadataSchema, required: false },
	payment: {
		type: Schema.Types.String,
		ref: "WalletTransaction",
		required: true,
		index: true,
	},
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

interface TransactionModel extends Model<Transaction> {
	updateStage(
		id: string,
		newStage: TransactionStage,
		authority: { id: string; role: "buyer" | "seller" },
		status?: TransactionStatus
	): Promise<Transaction>;
	updateStatus(
		id: string,
		status: TransactionStatus,
		authority: { id: string; role: "buyer" | "seller" }
	): Promise<Transaction>;
}

function updateStage(trx: Transaction, newStage: TransactionStage): Transaction {
	trx.stages.forEach((s: any) => {
		if (s.isCurrent) s.isCurrent = false;
	});

	trx.stages.push({
		stage: newStage,
		updatedAt: new Date(),
		isCurrent: true,
		transactionHash: "",
	});

	trx.updatedAt = new Date();

	return trx;
}

transactionSchema.statics.updateStage = async function (
	id: string,
	newStage: TransactionStage,
	authority: { id: string; role: "buyer" | "seller" },
	status?: TransactionStatus
) {
	if (isEmpty(id) || isEmpty("newStage"))
		throw new HttpException(
			400,
			"Please provide both transaction id and transaction stage"
		);

	if (isEmpty(authority) || !authority.id || !authority.role)
		throw new HttpException(400, "Invalid authority payload");

	const { id: authorityId, role } = authority;

	let trx: Transaction = await this.findById(id);
	if (!trx) throw new HttpException(404, "Transaction with id not found");
	if (trx[role] !== authorityId)
		throw new HttpException(401, `${role} not authorized to complete this action`);

	trx = updateStage(trx, newStage);

	if (newStage === TransactionStage.Completed) {
		trx.status = TransactionStatus.Completed;
	} else if (newStage === TransactionStage.Declined && role === "buyer") {
		trx.status = TransactionStatus.Cancelled;
	} else if (newStage === TransactionStage.Declined && role === "seller") {
		trx.status = TransactionStatus.Declined;
	}

	if (status) {
		trx.status = status;
	}
	await trx.save();
	return trx;
};

transactionSchema.statics.updateStatus = async function (
	id: string,
	status: TransactionStatus,
	authority: { id: string; role: "buyer" | "seller" }
) {
	if (isEmpty(id) || isEmpty("newStage"))
		throw new HttpException(
			400,
			"Please provide both transaction id and transaction stage"
		);

	if (isEmpty(authority) || !authority.id || !authority.role)
		throw new HttpException(400, "Invalid authority payload");

	const { id: authorityId, role } = authority;

	let trx: Transaction = await this.findById(id);
	if (!trx) throw new HttpException(404, "Transaction with id not found");
	if (trx[role] !== authorityId)
		throw new HttpException(401, `${role} not authorized to complete this action`);

	trx.status = status;
	trx.updatedAt = new Date();

	if (status === TransactionStatus.Declined) {
		trx = updateStage(trx, TransactionStage.Declined);
	}
	await trx.save();
	return trx;
};

const transactionModel = model<Transaction, TransactionModel>(
	"Transaction",
	transactionSchema,
	"transactions"
);
export default transactionModel;
