const validator = require("validator");

const checkIsUpdateAllowed = (data) => {
    const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));

    if (data.skills && data.skills.length > 10) {
        throw new Error("Only 10 skills are allowed!");
    }

    if (!isUpdateAllowed) {
        throw new Error("Update not allowed!");
    }
};

const validateLoginData = (emailId, password) => {
    if (!emailId || !password) {
        throw new Error("Please enter the details. Login failed!");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email id!");
    }
};

module.exports = {
    checkIsUpdateAllowed,
    validateLoginData
}