const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");

const getSecretRoomId = (loggedInUserId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([loggedInUserId, targetUserId].sort().join("_"))
    .digest("hex");
};

const formatTime = (isoString) => {
 const date = new Date(isoString);

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} · ${timePart}`;
}

const initialiseSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // handle events

    socket.on("joinChat", ({ loggedInUser, targetUserId }) => {
      const roomId = getSecretRoomId(loggedInUser?._id, targetUserId);
      console.log(
        "### " + loggedInUser?.firstName + " joined the room -",
        roomId,
      );
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ fromUserId, targetUserId, from, text }) => {
        try {
          const roomId = getSecretRoomId(fromUserId, targetUserId);

          // Save message
          let chat = await Chat.findOne({
            participants: { $all: [fromUserId, targetUserId] }
          });

          // No previous chat exists
          if(!chat) {
            chat = new Chat({
                participants: [fromUserId, targetUserId],
                messages: []
            });
          }

          chat.messages.push({
            senderId: fromUserId,
            text
          });

          const savedChat = await chat.save();

          const lastMsgPos = savedChat.messages.length - 1;

          socket.to(roomId).emit("receiveMessage", {
            fromUserId,
            _id: savedChat.messages[lastMsgPos]._id,
            from,
            text,
            time: formatTime(savedChat.messages[lastMsgPos].createdAt)
          });
        } catch (err) {
          console.log("Error :" + err.message);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initialiseSocket;
