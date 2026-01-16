const mongoose = require("mongoose");

const DB_CONNECTION_STRING = "mongodb+srv://athirasurendran1296:athirasurendran1296@mynodecluster.wj5cm9u.mongodb.net/";
const DB_NAME = "devTinder";

const connectDB = async () => {
    // Connect to clusture - Returns a promise
    await mongoose.connect(DB_CONNECTION_STRING + DB_NAME) 
}

module.exports = connectDB;

