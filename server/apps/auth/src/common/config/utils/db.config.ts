require('dotenv').config()

export const DB_CONFIG = {
    DB_HOST: process.env.DB_AUTH_HOST,
    DB_PORT: parseInt(process.env.DB_AUTH_PORT || '5432'),
    DB_NAME: process.env.DB_AUTH_NAME,
    DB_USER: process.env.DB_AUTH_USER,
    DB_PASS: process.env.DB_AUTH_PASS,
}