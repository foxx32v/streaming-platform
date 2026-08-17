require('dotenv').config()

export const REFRESH_TOKEN = {
    SECRET : String(process.env.REFRESH_SECRET),
    EXPIRES : 15 * 1000 * 60 * 60 * 24, // day //
}

export const ACCESS_TOKEN = {
    SECRET : String(process.env.ACCESS_SECRET),
    EXPIRES : 5 * 1000 * 60 // min //
}