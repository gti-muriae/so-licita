import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';

export class MailProvider implements IMailProvider {
    private transport: Mail;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "95e9b1ff0064e4",
                pass: "50bbd9947a0aa8"
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