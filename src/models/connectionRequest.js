const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" // reference to the user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" // reference to the user collection
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type.`
      }
    },
  }, 
  { 
    timestamps: true 
  }
);

// Pre save --> Always called before save. Dont use arrow function 
connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;
  // use equals method as id is object id and not just string
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send request to yourself!");
  }
});

// Compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // 1 is ascending order

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;