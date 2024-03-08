import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { resolve } from "path";
import stripeModule  from "stripe";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from "./config/Database.js";
import User from './model/User.js'
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import VerificationCode from "./model/VerificationCode.js";

dotenv.config({ path: "../.env" });
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN, 
  credentials: true, 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(cookieParser());

const staticDir = process.env.STATIC_DIR || 'build';
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const clientSecret = process.env.CLIENT_SECRET;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const mysql = require('mysql2');

console.log("STATIC_DIR:", staticDir);
console.log("STRIPE_PUBLISHABLE_KEY:", stripePublishableKey);
console.log("CLIENT_SECRET:", clientSecret);
console.log("EMAIL: ", process.env.EMAIL_ADDRESS);
console.log("PASSWORD: ", process.env.EMAIL_PASSWORD);

const stripe = stripeModule (process.env.CLIENT_SECRET, {
  apiVersion: "2023-10-16"
});


app.use(express.static(resolve(__dirname, staticDir)));

try {
  await db.authenticate();
  console.log('DB connected')
  await User.sync();
  await VerificationCode.sync();
} catch (error) {
  console.error(error);
}

app.get('/', (req, res) => {
  // Send the 'index.html' file from the specified directory
  res.sendFile(resolve(__dirname, staticDir, 'index.html'));
});


app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      payment_method_types: ['card'],
      // automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});


app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://yourwebsite.com/success',
      cancel_url: 'https://yourwebsite.com/cancel',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const PORT = process.env.PORT || 5252;
app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`)
);
