import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';

export class MailProvider implements IMailProvider {
    private transport: Mail;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP,
            port: 2525,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL
            }
        })
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transport.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            }, from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}