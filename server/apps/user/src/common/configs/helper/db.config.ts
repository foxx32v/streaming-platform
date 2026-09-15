require('dotenv').config()

export const DB_CONFIG = {
    DB_HOST: process.env.DB_USER_HOST,
    DB_PORT: parseInt(process.env.DB_USER_PORT || '5433'),
    DB_NAME: process.env.DB_USER_NAME,
    DB_USER: process.env.DB_USER_USER,
    DB_PASS: process.env.DB_USER_PASS,
};