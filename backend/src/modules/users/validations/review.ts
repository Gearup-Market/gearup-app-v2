import Joi from "joi";

export const addReviewSchema = {
    body: Joi.object({
        reviewer: Joi.string().required(),
        reviewed: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().optional(),
        transaction: Joi.string().optional(),
    }),
};


export const getReviewsSchema = {
    params: Joi.object({
        userId: Joi.string().required(),
    })
}