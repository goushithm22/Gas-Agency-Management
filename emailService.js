const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password"
    }
});

async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: to,
            subject: subject,
            text: text
        });
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Email failed: ${error.message}`);
    }
}

module.exports = { sendEmail };
