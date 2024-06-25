import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { emailDataModel } from '../models/emailDataModel';

dotenv.config();

export class SendEmailService {
    private static instance: SendEmailService;
    private transporter: nodemailer.Transporter;
    private oauth2Client: any;

    private constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.OAUTH_CLIENTID,
            process.env.OAUTH_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground" // Redirect URL
        );

        this.oauth2Client.setCredentials({
            refresh_token: process.env.OAUTH_REFRESH_TOKEN
        });

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: this.getAccessToken(),
            },
        });
    }

    private getAccessToken() {
        const accessToken = this.oauth2Client.getAccessToken();
        return accessToken;
    }

    public static getInstance(): SendEmailService {
        if (!SendEmailService.instance) {
            SendEmailService.instance = new SendEmailService();
        }

        return SendEmailService.instance;
    }

    public async sendEmail(emailData: Partial<emailDataModel>) {
        const defaultEmailData: Partial<emailDataModel> = {
            from: "Confluentia <icplatform.fumec@gmail.com>"
        };

        const mailOptions = { ...defaultEmailData, ...emailData };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}