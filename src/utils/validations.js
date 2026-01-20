const validator = require("validator");

const validateLoginData = (emailId, password) => {
    if (!emailId || !password) {
        throw new Error("Please enter the details. Login failed!");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email id!");
    }
};

const validateProfileEditData = (req) => {
    const ALLOWED_EDIT = ["lastName", "age", "gender", "photoUrl", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every(key => ALLOWED_EDIT.includes(key));
    return isEditAllowed;
};

module.exports = {
    validateLoginData,
    validateProfileEditData
}