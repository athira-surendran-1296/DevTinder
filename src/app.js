const express = require("express");

const app = express();

// Request handlers
app.use("/hello",(req, res) => {
    res.send("Hello world!!");
});

app.use("/dashboard",(req, res) => {
    res.send("This is dashboard!!");
});

// Keeping the generic route at end
app.use("/",(req, res) => {
    res.send("Welcome to Dev Tinder!!");
});

app.listen("7777", () => {
    console.log("Server listening on port 7777...");
});