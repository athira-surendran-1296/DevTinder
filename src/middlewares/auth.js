const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({message: "Kindly login."});
    }
    // Decode JWT
    let { _id } = jwt.verify(token, '$ATH-DEV-TINDER', { expiresIn: '1h' });
    const user = await User.findById(_id);
    if (!user) {
        throw new Error("No user found.");
    }
    req.user = user;
    next();
};

module.exports = {
    userAuth
};