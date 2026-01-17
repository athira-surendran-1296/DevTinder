const express = require("express");

require("./config/database");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// To convert JSON data from client to JS object that the server understands
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        // Creating instance of a User modal
        const user = new User(req.body); 
        await user.save();
        res.send("User added successfully!");
    } catch(err) {
        res.status(401).send("Error saving the user:" + err.message);
    }
});

// Get user by email id
app.get("/user", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        const users = await User.find({emailId: userEmailId});
        res.send(users);
    } catch(err) {
        res.status(400).send("User not found");
    }
});

// Get all the users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(400).send("Unable to fetch the users");
    }
});

// Delete a user by id
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err) {
        res.status(400).send("Unable to delete the user");
    }
});

// Update a user by id
app.patch("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        const beforeUpdateUser = await User.findByIdAndUpdate(userId, req.body, { returnDocument: "before" });
        console.log("Data before update", beforeUpdateUser);
        res.send("User updated successfully");
    } catch(err) {
        res.status(400).send("Unable to update the user");
    }
});

// Update user by email id
app.patch("/userByEmail", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        const users = await User.find({emailId: userEmailId});
        if(users.length === 0) {
           res.status(400).send("User not found");
        }
        const userId = users[0]._id;
        await User.findByIdAndUpdate(userId, req.body);
        res.send("User updated successfully");
    } catch(err) {
        res.status(400).send("User not found");
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