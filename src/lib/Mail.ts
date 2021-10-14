import nodemailer from 'nodemailer';

const config = require('../config/mail.config')


export default nodemailer.createTransport(config)
