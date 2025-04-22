import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  interface MailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }

  export const sendEmail = async ({ to, subject, text, html }: MailOptions) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé:', info.response);
        return info;
      } catch (error) {
        console.error('Erreur lors de l’envoi de mail :', error);
        throw error;
      }
    };