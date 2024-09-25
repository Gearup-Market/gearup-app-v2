/* eslint-disable prettier/prettier */
import Joi from "joi";
import { AdminRole } from "../types";

export const userSignUpSchema = {
    body: Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required().min(8),
        role: Joi.string().valid(...Object.values(AdminRole)).required()
    }),
};

export const userSignInSchema = {
    body: Joi.object({
        userName: Joi.string().email().optional(),
        password: Joi.string().required(),
    }),
};