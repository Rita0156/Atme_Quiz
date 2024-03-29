
const express = require("express");
const cors = require("cors");
const { connectionDb } = require("./config/db");
const { categoryRouter } = require('./routes/index')
const { jsonDataRouter } = require('./routes/jsonData')
const passportStrategy = require('./googleAuth/passport')
const authRoute = require('./controller/google/index')
const passport =require('passport')
require("dotenv").config();
const PORT = process.env.PORT || 7500;

const app = express();

app.use(express.json());
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
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json("api running currently is Atme_quiz");
});

app.use("/api/contest",categoryRouter);
app.use('/api/json',jsonDataRouter);

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
