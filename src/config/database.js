const mongoose = require("mongoose");
const { DB_CONNECTION_STRING, DB_NAME } = require("../../env");

const connectDB = async () => {
    // Connect to clusture - Returns a promise
    await mongoose.connect(DB_CONNECTION_STRING + DB_NAME) 
}

module.exports = connectDB;

