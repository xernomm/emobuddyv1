// utils/mailer.js
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: "../../.env" });
// await sendEmail(email, subject, `Your verification code is: ${verificationCode}`, htmlBody);

export const sendEmail = async (recipient, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS, 
            pass: process.env.EMAIL_PASSWORD, 
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS, // Sender address
        to: recipient, // Recipient address (user's email)
        subject, // Subject line
        html,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        console.log(process.env.EMAIL_ADDRESS);
        console.log(process.env.EMAIL_PASSWORD);
        throw new Error('Failed to send email');
    }
};
