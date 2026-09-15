require('dotenv').config()

export const URL_CONFIG = {
    CLIENT: process.env.FRONTEND_URL || 'http://localhost:3001',
    GATEWAY: process.env.GATEWAY_URL || 'http://localhost:3002',
    AUTH: process.env.AUTH_URL || 'http://localhost:3000',
    USER: process.env.USER_URL || 'http://localhost:3004',
    STREAM: process.env.STREAM_URL || 'http://localhost:3003',
}