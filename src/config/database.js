const mongoose = require("mongoose");

const connectDB = async () => {
    // Connect to clusture - Returns a promise
    await mongoose.connect(process.env.DB_CONNECTION_STRING + process.env.DB_NAME);
}

module.exports = connectDB;

