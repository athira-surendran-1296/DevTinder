const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");

router.get("/chat/:targetUserId", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user?._id;
        const { targetUserId } = req.params;

        // TODO: Check if the targetUserId id a valid user in the DB

        // TODO: Check if logged in user and the target user are friends

        let chatDetails = await Chat.findOne({
            participants: { $all:[loggedInUserId, targetUserId] }
        }).populate({
            path: "messages.senderId",
            select: "firstName"
        }).populate("participants", "firstName lastName photoUrl");

        if(!chatDetails) {
            chatDetails = new Chat({
                participants: [loggedInUserId, targetUserId],
                messages: []
            });

            await chatDetails.save();
        }
        
        res.json(chatDetails);
        
    } catch (err) {
        res.status(400).send("Unable to fetch chats: " + err.message);
    }
});

module.exports = router;