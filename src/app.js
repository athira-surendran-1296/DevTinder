const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Using app.use here as we are doing auth for all types of requests GET,POST,PUT,PATCH,DELETE
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
    res.send("All data required for Admin");
});

app.get("/admin/getAllUserData", (req, res, next) => {
    res.send("All user data required for Admin");
});

app.get("/user/getAllData", userAuth, (req, res, next) => {
    res.send("All user data required for User");
});

app.get("/user/getErrorData", userAuth, (req, res, next) => {
    throw new Error("ERROR");
});

// Better error handling using try catch
app.get("/user/getErrorDataBetter", userAuth, (req, res, next) => {
    try {
        // Sone code ...
        throw new Error("ERROR");
    } catch (err) {
        res.status(500).send("Something went wrong - Contact support team!");
    }
});

// Catches any unexpected error that occures in the app --> call API /user/getErrorData
app.use("/", (error, req, res, next) => {
    if(error) {
        res.status(500).send("Something went wrong!")
    }
});

app.listen("7777", () => {
    console.log("Server listening on port 7777...");
});