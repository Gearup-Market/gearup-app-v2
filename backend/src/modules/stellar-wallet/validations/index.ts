import Joi from "joi";

export const createStellarWalletSchema = {
	body: Joi.object({
		userId: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

export const transferXLMSchema = {
	body: Joi.object({
		userId: Joi.string().required(),
		recipientPublicKey: Joi.string().required(),
		amount: Joi.string().required(),
	}),
};

export const getStellarWalletSchema = {
	params: Joi.object({
		userId: Joi.string().required(),
	}),
};
