import Joi from "joi";
import { TransactionStage, TransactionStatus, TransactionType } from "../types";
import { PaymentMethod } from "@/modules/wallet/types";

export const createTransactionSchema = {
	body: Joi.object({
		item: Joi.string().required(),
		buyer: Joi.string().required(),
		seller: Joi.string().required(),
		type: Joi.string()
			.valid(...Object.values(TransactionType))
			.required(),
		amount: Joi.number().required(),
		rentalPeriod: Joi.object({
			start: Joi.string().required(),
			end: Joi.string().required(),
		}).optional(),
		metadata: Joi.any().optional(),
		reference: Joi.string().optional(),
		method: Joi.string()
			.valid(...Object.values(PaymentMethod))
			.required(),
	}).unknown(false),
};

export const getUserTransactionSchema = {
	params: Joi.object({
		userId: Joi.string().required(),
	}),
};

export const getTransactionSchema = {
	params: Joi.object({
		id: Joi.string().required(),
	}),
};

export const changeTransactionStatusSchema = {
	body: Joi.object({
		status: Joi.string()
			.valid(...Object.values(TransactionStatus))
			.required(),
		authority: Joi.object({
			id: Joi.string().required(),
			role: Joi.string().valid("seller", "buyer").required(),
		}).required(),
	}).unknown(false),
	params: Joi.object({
		id: Joi.string().required(),
	}),
};

export const changeTransactionStageSchema = {
	body: Joi.object({
		stage: Joi.string()
			.valid(...Object.values(TransactionStage))
			.required(),
		authority: Joi.object({
			id: Joi.string().required(),
			role: Joi.string().valid("seller", "buyer").required(),
		}).required(),
        status: Joi.string()
        .valid(...Object.values(TransactionStatus)).optional()
	}).unknown(false),
	params: Joi.object({
		id: Joi.string().required(),
	}),
};
