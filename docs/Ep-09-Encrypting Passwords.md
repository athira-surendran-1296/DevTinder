# Notes

Encrypting Passwords
=====================
* We can use the bcrypt library - https://www.npmjs.com/package/bcrypt

// Encrypt password
        const hashedPswd = await bcrypt.hash(password, saltRounds);

// Decrypt password
        const isPasswordCorrect = await bcrypt.compare(password, hash);
