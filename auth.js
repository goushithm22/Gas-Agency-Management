const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("./firebase-config");
const logger = require("./logger");

async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        logger.info(`User registered: ${email}`);
        return userCredential.user;
    } catch (error) {
        logger.error(`Registration failed: ${error.message}`);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        logger.info(`User logged in: ${email}`);
        return userCredential.user;
    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        throw error;
    }
}

module.exports = { registerUser, loginUser };
