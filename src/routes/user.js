const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills";

// Get all the requests received by the logged in user that is pending for review
router.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const requestsReceived = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
            // }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"]);
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message: "Data fetched successfully",
            requestsReceived: requestsReceived
        });
    } catch (err) {
        res.status(400).send("Unable to fetch the requests received: " + err.message);
    }
});

// Get all list of connections that have been sent by the logged in user 
// or have been accepted by the logged in user 
router.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // We only need connections in accepted state
        // logged in user is either the fromUserId or toUserId
        const acceptedConnections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = acceptedConnections.map(row => {
            if (row.fromUserId.equals(loggedInUser._id)) {
                return ({
                    _id: row._id,
                    user: row.toUserId
                });
            }
            return ({
                _id: row._id,
                user: row.fromUserId
            });
        });

        res.json({
            message: "Data fetched successfully",
            acceptedConnections: data
        });
    } catch (err) {
        res.status(400).send("Unable to fetch the connections: " + err.message);
    }
});

module.exports = router;