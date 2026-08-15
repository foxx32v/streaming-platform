require('dotenv').config('./apps/auth/.env')

export const STRATEGY_GOOGLE_CONFIG = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    SCOPE: ['email', 'profile'],
}

export const STRATEGY_GITHUB_CONFIG = {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    SCOPE: ['user:email'],
}

export const STRATEGY_VK_CONFIG = {
    CLIENT_ID: process.env.VK_CLIENT_ID,
    CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
    CALLBACK_URL: process.env.VK_CALLBACK_URL,
    SCOPE: ['email'],
}