import { env } from "node:process";

/**
 * Absolute directory path used to store uploaded static files
 * for the AI Minehub development environment.
 */
export const STATIC_FILE_UPLOAD_DIR = `/public_html/storage/ai-minehub/${!env.NODE_ENV || env.NODE_ENV === "production" ? "" : "development"}`;
