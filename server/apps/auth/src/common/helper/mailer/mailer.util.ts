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
        const html = `<p>V ${url}</>`
        await this.sendMail(to, 'Verify email', html);
    }

    async sendResetPasswordEmail(to: string, token: string) {
        const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const html = `<p>R ${url}</p>`
        await this.sendMail(to, 'Reset password', html);
    }
}

export const mailer = new Mailer