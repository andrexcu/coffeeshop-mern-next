import express, { Request, Response, response } from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes/index";
import "./strategies/local-strategy";

require("dotenv").config();

const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
const corsOptions = {
  origin: (origin: any, callback: any) => {
    // Allow all origins
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: "andrexcu-dev-secret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
export default app;
