const paytmQRCode = "https://example.com/paytm-qr"; // Replace with actual QR code

function processPayment(paymentMethod) {
    if (paymentMethod === "Cash on Delivery") {
        return "Payment will be collected upon delivery.";
    } else if (paymentMethod === "Paytm") {
        return `Please scan the QR Code: ${paytmQRCode}`;
    } else {
        throw new Error("Invalid payment method.");
    }
}

module.exports = { processPayment };
