import Joi from "joi";
import { TransactionType } from "../types";

export const addItemToCartSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        listingId: Joi.string().required(),
        rentalPeriod: Joi.object({
            start: Joi.date().required(),
            end: Joi.date().required(),
        }).optional(),
        type: Joi.string().valid(...Object.values(TransactionType)).required(),
        customPrice: Joi.number().min(0).optional()
    }).unknown(false),
};

export const addItemsToCartSchema = {
    body: Joi.array().items(
        Joi.object({
            userId: Joi.string().required(),
            listingId: Joi.string().required(),
            rentalPeriod: Joi.object({
                start: Joi.date().required(),
                end: Joi.date().required(),
            }).optional(),
            type: Joi.string().valid(...Object.values(TransactionType)).required(),
            customPrice: Joi.number().min(0).optional()
        }).unknown(false),
    ) 
};

export const getUserCartSchema = {
    params: Joi.object({
        userId: Joi.string().required(),
    })
};

export const getUserCartItemSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        listingId: Joi.string().required(),
    }).unknown(false),
};