import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


type ValidationSchema = {
    body?: Joi.ObjectSchema<any> | Joi.ArraySchema; // Allow both ObjectSchema and ArraySchema
    params?: Joi.ObjectSchema<any>;
    query?: Joi.ObjectSchema<any>;
};

function parseValidationMessage(message: string | string[]): string {
    const removeBackslashes = (str: string) => str.replace(/["\\[\]]/g, "");

    if (Array.isArray(message)) {
        if (message.length > 1) {
            return message.map(removeBackslashes).join(" | ");
        }
        return removeBackslashes(message[0]);
    }

    return removeBackslashes(message);
}


const validationMiddleware = (schema: ValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        if (schema.body) {
            const { error, value } = schema.body.validate(req.body, validationOptions);
            if (error) {
                return res.status(400).json({
                    error: parseValidationMessage(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
                });
            }
            req.body = value;
        }

        if (schema.params) {
            const { error, value } = schema.params.validate(req.params, validationOptions);
            if (error) {
                return res.status(400).json({
                    error: `Validation error: ${error.details.map(x => x.message).join(', ')}`
                });
            }
            req.params = value;
        }

        if (schema.query) {
            const { error, value } = schema.query.validate(req.query, validationOptions);
            if (error) {
                return res.status(400).json({
                    error: `Validation error: ${error.details.map(x => x.message).join(', ')}`
                });
            }
            req.query = value;
        }

        next();
    };
};

export default validationMiddleware