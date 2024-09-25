import Joi from "joi";

export const registerKycSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        bvn: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        birthday: Joi.string().optional(),
        country: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.string().required(),
        phoneNumber: Joi.string().optional().min(10).max(14),
    }),
};

export const updateKycSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        bvn: Joi.string().optional(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        birthday: Joi.string().optional(),
        country: Joi.string().optional(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        postalCode: Joi.string().optional(),
        documentType: Joi.string().optional(),
        documentPhoto: Joi.array().items(
            Joi.string().required()
        ).optional(),
        phoneNumber: Joi.string().optional().min(10).max(14),
    }),
};

export const resendKycOtpSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        phoneNumber: Joi.string().optional().min(10).max(14),
    })
}

export const validateKycOtpSchema = {
    body: Joi.object({
        code: Joi.string().required(),
        userId: Joi.string().required(),
    })
}

export const updateWalletSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        accountName: Joi.string().required(),
        accountNumber: Joi.string().required(),
        bankName: Joi.string().required(),
    }),
};