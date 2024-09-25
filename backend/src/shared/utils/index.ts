/* eslint-disable prettier/prettier */
import crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/core/config';
import { logger } from '@/core/utils/logger';
import stream from 'stream';
import path from 'path';

// Cloudinary configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export const uploadImagesToCloudinary = async (images: Express.Multer.File[], folder: string = 'listings'): Promise<string[]> => {    
    const uploadSingleImage = (file: Express.Multer.File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const publicId = path.parse(file.originalname).name;
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    public_id: publicId
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result?.secure_url || '');
                    }
                }
            );

            // Convert buffer to readable stream and pipe it to Cloudinary
            const bufferStream = new stream.PassThrough();
            bufferStream.end(file.buffer);
            bufferStream.pipe(uploadStream);
        });
    };

    // Upload all images using the uploadSingleImage helper
    const uploadedImages = await Promise.all(images.map(uploadSingleImage));
    return uploadedImages;
};

export function sanitize(input: any, excludeKeys: string[] = []) {
    if (typeof input === "string") {
        return input.toLowerCase().trim();
    } else if (typeof input === "object" && input !== null) {
        const sanitizedObject: any = {};
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                sanitizedObject[key] = excludeKeys.includes(key) ? input[key] : sanitize(input[key], excludeKeys);
            }
        }
        return sanitizedObject;
    }
    return input;
}

const generateToken = (): { token: string, expiry: Date } => {
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // Token is valid for 1 hour
    return { token, expiry };
};

const generateOtpToken = (): { code: string, expiresAt: Date } => {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
    const expiresAt = new Date(Date.now() + 3600000); // code is valid for 1 hour
    return { code, expiresAt };
};

const isTokenExpired = (expiry: Date): boolean => {
    return new Date() > expiry;
};

export { generateToken, isTokenExpired, generateOtpToken };