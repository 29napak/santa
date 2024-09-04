const nodemailer = require('nodemailer');

// Use Ethereal for testing
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'keara.weber45@ethereal.email',
        pass: 'hjvw2RC4MNJSevAbnN'
    }
});

function sendEmails(pendingRequests) {
    if (pendingRequests.length > 0) {
        const emailPromises = pendingRequests.map(req => {
            const mailOptions = {
                from: 'do_not_reply@northpole.com',
                to: 'santa@northpole.com',
                subject: 'New Christmas Wish',
                text: `Username: ${req.username}\nAddress: ${req.address}\nWish: ${req.wish}`
            };

            return transporter.sendMail(mailOptions);
        });

        Promise.all(emailPromises)
            .then(() => {
                console.log('All emails sent successfully!');
                pendingRequests.length = 0; // Clear pendingRequests after sending emails
            })
            .catch(error => {
                console.error('Failed to send emails:', error);
            });
    }
}

module.exports = { sendEmails };
