/* eslint-disable prettier/prettier */
import Joi from "joi";

export const userSignUpSchema = {
    body: Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
        //phoneNumber: Joi.string().optional().min(10),
    }),
};

export const userSignInSchema = {
    body: Joi.object({
        email: Joi.string().email().optional(),
        password: Joi.string().required(),
        //phoneNumber: Joi.string().optional().min(10),
    }),
};
export const resetPasswordRequestSchema = {
    body: Joi.object({
        email: Joi.string().email().optional(),
        // password: Joi.string().required(),
        //phoneNumber: Joi.string().optional().min(10),
    }),
};


export const resetPasswordVerifySchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        token: Joi.string().length(6).required(),
        // newPassword: Joi.string().min(8).required(),
    }),
};

export const resetPasswordSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        token: Joi.string().length(6).required(),
        newPassword: Joi.string().min(8).required(),
    }),
};