import express, { Request, Response, response } from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes/index";
import "./strategies/local-strategy";

require("dotenv").config();

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const frontendDomain = isProduction
  ? "https://coffeeshop-mern-next-app.vercel.app"
  : "http://localhost:3000";

const corsOptions = {
  origin: "https://coffeeshop-mern-next-app.vercel.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
// app.enable('trust proxy')

// app.use(
//   session({
//     secret: "andrexcu-dev-secret",
//     saveUninitialized: false,
//     resave: false,
//     proxy: true,
//     name: "CoffeeShopCookie",
//     cookie: {
//       httpOnly: true,
//       secure: true,
//       maxAge: 60000 * 60,
//       sameSite: "none",
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
app.use(routes);
export default app;
