const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (loggedInUserId, targetUserId) => {
    return crypto.createHash("sha256")
                 .update([loggedInUserId, targetUserId].sort().join("_"))
                 .digest("hex");
};

const initialiseSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        // handle events

        socket.on("joinChat", ({loggedInUser, targetUserId}) => {
            const roomId = getSecretRoomId(loggedInUser?._id, targetUserId);
            console.log("### " + loggedInUser?.firstName + " joined the room -", roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage", ({fromUserId, targetUserId, from, text, time}) => {
            const roomId = getSecretRoomId(fromUserId, targetUserId);
            socket.to(roomId).emit("receiveMessage", {
                fromUserId,
                from,
                text,
                time
            });
        });

        socket.on("disconnect", () => {

        });
    });
};

module.exports = initialiseSocket;