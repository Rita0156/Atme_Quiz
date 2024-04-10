const express = require("express");
const cors = require("cors");
const { connectionDb } = require("./config/db");
const fs = require('fs')
const authRoute = require('./controller/google/index')
const passport = require('passport');
const cookieSession = require("cookie-session");
const passportStrategy = require('./googleAuth/passport')
const bodyParser = require('body-parser');
require("dotenv").config();
const { jsonDataRouter } = require('./routes/jsonData');

const PORT = process.env.PORT || 7500;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "*",
		methods: "GET,POST,PUT,DELETE,PATCH",
       
		credentials: true,
	})
);

app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb) => {
          cb()
      }
  }
  next()
})
passportStrategy(passport);
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.json("API running: Atme_quiz");
});
app.use("/", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

app.use('/api/contests', jsonDataRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

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
