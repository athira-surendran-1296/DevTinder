const express = require("express");

require("./config/database");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    try {
        // Creating instance of a User modal
        const user = new User({ 
            firstName: "Varun",
            lastName: "Kallinkeel",
            emailId: "varunkallinkeel@gmail.com",
            password: "varun@123",
            age: 35,
            gender: "Male"
        }); 
        await user.save();
        res.send("User added successfully!");
    } catch(err) {
        res.status(401).send("Error saving the user:" + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established....");
    }).catch(err => {
        console.log("Database connection failed....", err);
    });

// Catches any unexpected error that occures in the app 
app.use("/", (error, req, res, next) => {
    if (error) {
        res.status(500).send("Something went wrong!")
    }
});

app.listen("7777", () => {
    console.log("Server listening on port 7777...");
});