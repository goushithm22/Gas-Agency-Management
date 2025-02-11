// src/test-firebase.js
const { auth, db } = require("./firebase-config");

console.log("Checking Firebase Initialization...");

if (!auth) {
    console.error("❌ Firebase Auth is NOT initialized.");
} else {
    console.log("✅ Firebase Auth initialized successfully.");
}

if (!db) {
    console.error("❌ Firebase Firestore is NOT initialized.");
} else {
    console.log("✅ Firebase Firestore initialized successfully.");
}
