require('dotenv').config({path: './apps/auth/.env' })

export const REFRESH_TOKEN = {
    SECRET : process.env.REFRESH_SECRET,
    EXPIRES : 15 * 1000 * 60 * 60 * 24, // day //
}

export const ACCESS_TOKEN = {
    SECRET : process.env.ACCESS_SECRET,
    EXPIRES : 5 * 1000 * 60 // min //
}