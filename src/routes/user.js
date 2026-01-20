const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Unable to fetch the users");
    }
});

module.exports = router;