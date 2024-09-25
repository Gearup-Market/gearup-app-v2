/* eslint-disable prettier/prettier */
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465, // Use 587 for STARTTLS or 465 for SSL
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});