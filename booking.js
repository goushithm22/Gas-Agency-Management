const { db } = require("./firebase-config");
const { doc, updateDoc, getDoc } = require("firebase/firestore");
const logger = require("./logger");
const { sendEmail } = require("C:\Users\goush\OneDrive\Desktop\UnifiedMentor\Projects\gas-agency-system\gasagency\src\emailService.js");

async function bookCylinder(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error(`User ${userId} not found.`);
        }

        const barrelsRemaining = userSnap.data().barrelsRemaining || 0;
        if (barrelsRemaining <= 0) {
            throw new Error(`User ${userId} has no barrels remaining.`);
        }

        await updateDoc(userRef, {
            barrelsRemaining: barrelsRemaining - 1,
            bookingHistory: [...(userSnap.data().bookingHistory || []), {
                id: Date.now(),
                date: new Date().toISOString(),
                status: "Pending"
            }]
        });

        sendEmail(userSnap.data().email, "Booking Confirmed", "Your cylinder booking is confirmed.");
        logger.info(`User ${userId} booked a cylinder.`);
    } catch (error) {
        logger.error(`Booking failed: ${error.message}`);
    }
}

module.exports = { bookCylinder };
