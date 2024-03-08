import { cookie, validationResult } from 'express-validator';
import Users from "../model/User.js";
import bcrypt from "bcrypt"
import { sendEmail } from '../utils/mailer.js';
import VerificationCode from '../model/VerificationCode.js';
import { Sequelize  } from "sequelize";
import jwt from "jsonwebtoken"



function generateVerificationCode() {
    // Generate a random 6-digit code
    return Math.floor(100000 + Math.random() * 900000);
}

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
    }
}

export const register = async (req, res) => {
    // Extract fields from request body
    const { username, email, bonusLink, password, confirmpassword } = req.body;

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: 'Email address is already registered' });
    }

    // Perform additional validations (e.g., password and email format)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    if (password !== confirmpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new Users({
        username,
        email,
        bonusLink,
        password: hashedPassword,
        isVerified: false,
    });

    const verificationCode = generateVerificationCode();

    // Calculate the expiration time (e.g., 10 minutes from now)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10);

    await VerificationCode.create({
        email,
        code: verificationCode,
        expiry_time: expirationTime,
    });

    try {
        // Save the user to the database
        await newUser.save();

        // Send verification email to the user
        const subject = 'Email Verification - Emobuddy';
        const htmlBody = 
        `<div style="background-color: #F3F2F1; padding: 4%;">
            <p style='font-size: 25px; text-align: center;' >Hello <strong>${username}</strong>!</p>
            <p style='font-size: 15px; text-align: center;' >Thank you for registering with us. Please insert the <strong>6-digit verification code</strong> below to complete your verification:</p>
            <p style='font-size: 45px; text-align: center;' ><strong>${verificationCode}</strong></p>
            <p style='font-size: 15px; text-align: center;' >This code will expire in 10 minutes.</p>
        </div>`;
        await sendEmail(email, subject, htmlBody);

        res.status(201).json({ message: 'User registered successfully. Please check your email for verification instructions.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const sendVerificationCode = async (req, res) => {
    // Extract the email from the request body
    const { email } = req.body;
    const verificationCode = generateVerificationCode();
    try {
        // Send the verification code to the user's email
        const subject = 'Email Verification - Emobuddy';
        const htmlBody = 
        `<p style='font-size: 15px;' >Your verification code is:</p>
         <p style='font-size: 45px;' ><strong>${verificationCode}</strong></p>
         <p style='font-size: 15px;' >This code will expire in 10 minutes.</p>`;

        await sendEmail(email, subject, htmlBody);

        res.status(201).json({ message: 'User registered successfully. Please check your email for verification instructions.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send verification code' });
    }
};

export const verifyEmail = async (req, res) => {
    // Extract the verification code from the request
    const { verificationCode } = req.body;

    // Look up the verification code in the database
    const codeRecord = await VerificationCode.findOne({
        where: {
            code: verificationCode,
            expiry_time: {
                [Sequelize.Op.gt]: new Date(), // Check if code has not expired
            },
        },
    });

    if (codeRecord) {

        await Users.update({ isVerified: true }, { where: { email: codeRecord.email } });
        await codeRecord.destroy();

        res.json({ message: 'Email verified successfully' });
    } else {
        res.status(400).json({ error: 'Invalid or expired verification code' });
    }
};

export const Login = async(req,res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"wrong password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '300s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000
            // secure: true 
        });
        console.log(cookie)
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"})
    }
}

export const Logout = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email // Assuming you have the user's email in the request
            },
            attributes: ['refresh_token'] // Include 'refresh_token' field
        });

        if (!user) {
            return res.sendStatus(204); // No user found, return without doing anything
        }

        const refreshToken = user.refresh_token;

        if (!refreshToken) {
            return res.sendStatus(204); // No refresh token found, return without doing anything
        }

        // Clear the refresh token from the user record in the database
        await Users.update({ refresh_token: null }, {
            where: {
                email: req.body.email // Assuming you have the user's email in the request
            }
        });

        // Clear the refresh token cookie
        res.clearCookie('refreshToken');

        return res.sendStatus(200); // Logout successful
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

