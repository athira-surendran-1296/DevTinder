const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validations");
const { encryptPassword } = require("../utils/password");

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Unable to fetch profile data: " + err.message);
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        const isEditAllowed = validateProfileEditData(req);
        if(!isEditAllowed)
            throw new Error("Invalid update request!");

        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();

        res.json({
            status: 200,
            message: loggedInUser.firstName + ", your profile is updated successfully!",
            data: loggedInUser
        });
        
    } catch (err) {
        res.status(400).send("Unable to edit profile data: " + err.message);
    }
});

router.patch("/profile/password", userAuth, async (req, res) => {
    try {

        const isEditAllowed = Object.keys(req.body).every(key => ["password"].includes(key));
        if(!req.body.password || !isEditAllowed)
            throw new Error("Invalid password update request!");

        // Encrypt password
        const hashedPswd = await encryptPassword(req.body.password);

        const loggedInUser = req.user;

        loggedInUser.password = hashedPswd;

        await loggedInUser.save();

        res.json({
            status: 200,
            message: loggedInUser.firstName + ", your password is updated successfully!"
        });
        
    } catch (err) {
        res.status(400).send("Unable to update password: " + err.message);
    }
});

module.exports = router;