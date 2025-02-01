const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: "comgrocery@gmail.com", // Your email address
    pass: "grocery123!", // Your email password or app-specific password
  },
});

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: "comgrocery@gmail.com",
    to: email,
    subject: "Grocery.com - Verify Your Email!",
    text: `Your verification code is: ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
