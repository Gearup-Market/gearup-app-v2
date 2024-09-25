import Joi from "joi";

export const createOrFindWalletSchema = {
    params: Joi.object({
        userId: Joi.string().required()
    }),
};

export const updateWalletSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        accountName: Joi.string().required(),
        accountNumber: Joi.string().required(),
        bankName: Joi.string().required(),
    }),
};

export const creditOrDebitWalletSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        amount: Joi.number().min(1000).required(),
        description: Joi.string().optional(),
    }),
};

export const getAllTransactionsSchema = {
    query: Joi.object({
        limit: Joi.number().optional(),
        skip: Joi.number().optional(),
    }),
};

export const getUserTransactionsSchema = {
    params: Joi.object({
        userId: Joi.string().required()
    }),
    query: Joi.object({
        limit: Joi.number().optional(),
        skip: Joi.number().optional(),
    }),
};

export const getTransactionByIdSchema = {
    params: Joi.object({
        txId: Joi.string().required()
    }),
};