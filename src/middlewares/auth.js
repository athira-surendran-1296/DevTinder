const adminAuth = (req, res, next) => {
    console.log("Checking ADMIN auth...");

    const isValid = false; // false

    if(!isValid) {
        res.status(401).send("Unauthorised access");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("Checking USER auth...");

    const isValid = true; // false

    if(!isValid) {
        res.status(401).send("Unauthorised access");
    } else {
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
};