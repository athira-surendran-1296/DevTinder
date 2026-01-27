const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const fromUserId = loggedInUser._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // Check for invalid status
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid status");
        }

        // Check if toUserId is exists in the DB
        const toUser = await User.findById(toUserId);
        if(!toUser) {
             throw new Error("User not found");
        }

        // Check if already a connection exists from user 1 to user 2 or from user 2 to user 1
        // In this case connection should not be allowed to get created
        const existingConnection = await ConnectionRequest.findOne({ 
            $or: [ 
                { fromUserId, toUserId }, 
                { fromUserId: toUserId, toUserId: fromUserId } 
            ] 
        });

        if(existingConnection) {
            throw new Error("Connection already exists");
        }

        // Check if fromUserId and toUserId are same 
        // ---> handled at schema PRE method

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const connection = await connectionRequest.save();

        res.json({
            message: "Connection sent from " + loggedInUser.firstName + " to " + toUser.firstName + " : " + status,
            data: connection
        });

    } catch (err) {
        res.status(400).send("Unable to send connection request: " + err.message);
    }
});

module.exports = router;