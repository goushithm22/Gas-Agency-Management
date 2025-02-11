const { db } = require("./firebase-config");
const { doc, updateDoc, getDoc } = require("firebase/firestore");
const logger = require("./logger");

async function approveBooking(userId, bookingId, status) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("User not found.");
        }

        let bookings = userSnap.data().bookingHistory || [];

        bookings = bookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: status } : booking
        );

        await updateDoc(userRef, { bookingHistory: bookings });
        logger.info(`Admin ${status} booking ${bookingId} for user ${userId}`);
    } catch (error) {
        logger.error(`Admin booking approval failed: ${error.message}`);
    }
}

module.exports = { approveBooking };
