require('dotenv').config({ path: './apps/auth/.env' })

export const MAILER_CONFIG = {
    HOST: process.env.MAIL_HOST,
    PORT: parseInt(process.env.MAIL_PORT || '465'),
    SECURE: process.env.MAIL_SECURE === 'true' || true,
    AUTH: {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASSWORD
    },
    FROM: process.env.MAIL_FROM,
}