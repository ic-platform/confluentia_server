/* Imports:
================================================================================*/
    import nodemailer, { Transporter } from 'nodemailer';
    import dotenv from 'dotenv';
    import { emailDataModel, oAuthDataModel } from '../models/emailDataModel';

/* Setting Dotenv:
================================================================================*/
    dotenv.config();

/* Class:
================================================================================*/
    export class SendEmailService {
        /* Constructor:
        ========================================================================*/
            constructor() {}

        /* Singleton Instance for Class:
        ========================================================================*/
            private static instance: SendEmailService;
        
            static getInstance() {
                if (!SendEmailService.instance) {
                    SendEmailService.instance = new SendEmailService();
                }
                return SendEmailService.instance;
            }

        /* OAuth2 Configuration:
        ========================================================================*/
            private oAuth2Config: oAuthDataModel = {
                type: 'OAuth2',
                user: process.env.EMAIL_USER || '',
                clientId: process.env.CLIENT_ID || '',
                clientSecret: process.env.CLIENT_SECRET || '',
                refreshToken: process.env.REFRESH_TOKEN || ''
                // accessToken will be obtained by nodemailer when needed.
            }

        /* Setting SMTP Configuration for Gmail:
        ========================================================================*/
            private transporter: Transporter = nodemailer.createTransport({
                //@ts-ignore
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: this.oAuth2Config
            });

        /* Default Partial Email Data:
        ========================================================================*/
            private emailData: Partial<emailDataModel> = {
                from: process.env.EMAIL_USER || ''
            }
        
        /* Function to send an email:
        ========================================================================*/
            public async sendEmail(emailData: Partial<emailDataModel>) {
                const email = { ...this.emailData, ...emailData };

                try {
                    const info = await this.transporter.sendMail(email);
                    return 'Message sent: %s' + info.messageId;

                } catch (error) {
                    return 'Error sending email: %s' + error;
                }
            }
    }