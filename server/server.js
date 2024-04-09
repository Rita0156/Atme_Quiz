const express = require("express");
const cors = require("cors");
const { connectionDb } = require("./config/db");
const fs = require('fs')
const authRoute = require('./controller/google/index')
const passport = require('passport');
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
require("dotenv").config();
const { jsonDataRouter } = require('./routes/jsonData');

const PORT = process.env.PORT || 7500;

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session and Passport
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 1000, // Corrected maxAge value
    })
);
app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

// Routes
app.use("/", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

app.use("/auth", authRoute);
app.use('/api/contests', jsonDataRouter);

app.get("/", (req, res) => {
    res.json("API running: Atme_quiz");
});

// Start server
app.listen(PORT, async () => {
    try {
        await connectionDb;
        console.log("Connected to the database successfully");
        console.log("Server is running on port:", PORT);
    } catch (err) {
        console.error("Failed to connect to the database");
        console.error("Connection error:", err);
    }
});
