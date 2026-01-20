const express = require("express");

const router = express.Router();
const User = require("../models/user");
const { validateLoginData } = require("../utils/validations");
const { encryptPassword } = require("../utils/password");

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender } = req.body;

        // Encrypt password
        const hashedPswd = await encryptPassword(password);

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

router.post("/login", async (req, res) => {
    try {
        let { emailId, password } = req.body;

        // Validate
        validateLoginData(emailId, password);

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            res.status(400).send("No user found! Login failed!");
        }

        // Decrypt password
        const isPasswordCorrect = await user.validatePassword(password);

        if (!isPasswordCorrect) {
            res.status(400).send("Incorrect password! Login failed!");
        }

        // Create a jwt token
        let token = await user.getJWT();

        res.cookie("token", token, { expires: new Date(Date.now() + (60 * 60 * 1000))});
        
        res.send("Logged in successfully!");
    } catch (err) {
        res.status(400).send("Login failed!" + err.message);
    }
});

router.post("/logout", (req, res) => {
    res
        .cookie("token", null, { expires: new Date(Date.now())})
        .send("Logged out successfully");
});

module.exports = router;