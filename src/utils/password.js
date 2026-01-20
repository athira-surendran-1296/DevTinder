
const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const decryptAndComparePassword = async (userInputPassword, passwordStoredInDb) => {
    return await bcrypt.compare(userInputPassword, passwordStoredInDb);
};

module.exports = {
    encryptPassword,
    decryptAndComparePassword
};