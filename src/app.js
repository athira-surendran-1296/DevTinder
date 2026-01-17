const express = require("express");
const validator = require("validator");

require("./config/database");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { checkIsUpdateAllowed } = require("./utils/validations");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// To convert JSON data from client to JS object that the server understands
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender } = req.body;

        // Encrypt password
        const hashedPswd = await bcrypt.hash(password, saltRounds);

        // Creating instance of a User modal
        const user = new User({
            firstName, lastName, emailId, age, gender, password: hashedPswd
        });

        await user.save();
        res.send("User added successfully!");
    } catch (err) {
        res.status(401).send("Error saving the user:" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        let {emailId, password} = req.body;
        if(!emailId || !password) {
            res.status(400).send("Please enter the details. Login failed!");
        }
        if(!validator.isEmail(emailId)) {
            res.status(400).send("Invalid email id!");
        }
        const user = await User.find({ emailId: emailId });
        console.log("USER", user);
        if(user.length === 0) {
            res.status(400).send("No user found! Login failed!");
        }
        // Decrypt password
        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        if(!isPasswordCorrect) {
            res.status(400).send("Incorrect password! Login failed!");
        }
        res.send("Logged in successfully!");
    } catch (err) {
        res.status(400).send("Login failed!"+ err.message);
    }
});

// Get user by email id
app.get("/user", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmailId });
        res.send(users);
    } catch (err) {
        res.status(400).send("User not found");
    }
});

// Get all the users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Unable to fetch the users");
    }
});

// Delete a user by id
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Unable to delete the user");
    }
});

// Update a user by id
app.patch("/user/:userId", async (req, res) => {
    try {
        checkIsUpdateAllowed(req.body);
        const userId = req.params.userId;
        const beforeUpdateUser = await User.findByIdAndUpdate(userId, req.body, { returnDocument: "before", runValidators: true });
        console.log("Data before update", beforeUpdateUser);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Unable to update the user: " + err.message);
    }
});

// Update user by email id
app.patch("/userByEmail", async (req, res) => {
    checkIsUpdateAllowed(req.body);
    const userEmailId = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmailId }, { runValidators: true });
        if (users.length === 0) {
            res.status(400).send("User not found");
        }
        const userId = users[0]._id;
        await User.findByIdAndUpdate(userId, req.body);
        res.send("User updated successfully");
    } catch (err) {
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