require('dotenv').config()

export const CORS_CONFIG = {
    ORIGIN: [
        process.env.FRONTEND_URL || 'http://localhost:3001',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        /^http:\/\/127\.0\.0\.1:\d+$/,
        /^http:\/\/localhost:\d+$/,
    ],
    METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    CREDENTIALS: true,
}