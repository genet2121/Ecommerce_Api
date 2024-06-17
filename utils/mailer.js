const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, token) => {
  const url = `http://localhost:8080/api/users/verify/${token}`;

  try {
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `Please click <a href="${url}">here</a> to verify your email.`
    });
    console.log('Email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
};

module.exports = { sendVerificationEmail };
