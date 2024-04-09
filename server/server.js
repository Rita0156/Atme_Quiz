
const express = require("express");
const cors = require("cors");
const { connectionDb } = require("./config/db");
const fs = require('fs')
const authRoute = require('./controller/google/index')
const passport =require('passport');
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
require("dotenv").config();
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
const { jsonDataRouter } = require('./routes/jsonData')

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

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json("api running currently is Atme_quiz");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.use('/api/contests',jsonDataRouter);

app.listen(PORT, async () => {
  try {
    await connectionDb;
    console.log("connection done with db successfully");
    console.log("server running on port --->  ", PORT);
  } catch (err) {
    console.log("failed to connect db");
    console.log("conection error is  ------------------>   ", err);
  }
});
