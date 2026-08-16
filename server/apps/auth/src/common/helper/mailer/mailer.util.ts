import * as nodemailer from 'nodemailer';
import { MAILER_CONFIG } from "../../config/utils/mailer.config";

export class Mailer {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: MAILER_CONFIG.HOST,
            port: MAILER_CONFIG.PORT,
            secure: MAILER_CONFIG.SECURE,
            auth: {
                user: MAILER_CONFIG.AUTH.USER,
                pass: MAILER_CONFIG.AUTH.PASS,
            }
        })
    }

    async sendMail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: MAILER_CONFIG.FROM,
            to,
            subject,
            html,
        })
    }

    async sendVerificationEmail(to: string, token: string) {
        const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        const html = `
            <h1>Verify Your Email</h1>
            <p>Hi!</p>
            <p>Click the link below to verify your email:</p>
            <a href="${url}">${url}</a>
            <p>If you didn't register, ignore this email.</p>
            <br>
            <p>Best regards,<br>PerepihoticWatch Team</p>
        `
        await this.sendMail(to, 'Verify your email', html);
    }

    async sendResetPasswordEmail(to: string, token: string) {
        const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const html = `
            <h1>Reset Your Password</h1>
            <p>Hi!</p>
            <p>Click the link below to reset your password:</p>
            <a href="${url}">${url}</a>
            <p>If you didn't request this, ignore this email.</p>
            <br>
            <p>Best regards,<br>PerepihoticWatch Team</p>
        `
        await this.sendMail(to, 'Reset your password', html);
    }

    async welcome(to: string) {
        const html = `
            <h1>Welcome to PerepihoticWatch!</h1>
            <p>We're glad to have you on board!</p>
            <p>Enjoy your stay!</p>
            <br>
            <p>Best regards,<br>PerepihoticWatch Team</p>
        `
        await this.sendMail(to, 'Welcome to PerepihoticWatch!', html);
    }
}

export const mailer = new Mailer