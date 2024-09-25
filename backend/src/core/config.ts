import { config } from "dotenv";
// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
// export const LOG_DIR = 'logs';

export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_DATABASE,
    SECRET_KEY,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    BASE_URL
} = process.env;

export const db = {
    user: DB_USER || "",
    password: DB_PASS || "",
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10"),
};
