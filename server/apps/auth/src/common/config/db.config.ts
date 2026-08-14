require('dotenv').config({path: 'config'})

export const DB_CONFIG = {
    DB_HOST: process.env.HOST,
    DB_PORT: process.env.PORT,
    DB_NAME: process.env.NAME,
    DB_USER: process.env.USER,
    DB_PASS: process.env.PASS,
}