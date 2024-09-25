import "dotenv/config";

export const isProduction = () => process.env.NODE_ENV === "production";

export const isDevelopment = () => process.env.NODE_ENV === "development";

export const isStellarMainnet = () => process.env.STELLAR_MAINNET === "true";