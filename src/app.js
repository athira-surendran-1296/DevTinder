require("./config/database");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');

// Route imports
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");

const express = require("express");
const app = express();

// To convert JSON data from client to JS object that the server understands
app.use(express.json());

// To parse cookie from client
app.use(cookieParser())

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", requestRouter);

connectDB()
    .then(() => {
        console.log("Database connection established....");
    }).catch(err => {
        console.log("Database connection failed....", err);
    });

// Catches any unexpected error that occures in the app 
app.use("/", (error, req, res, next) => {
    if (error) {
        res.status(500).send("ERROR: " + error)
    }
});

app.listen("7777", () => {
    console.log("Server listening on port 7777...");
});