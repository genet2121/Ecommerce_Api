const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

const sendEmail = async (email, subject, message) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      to: email,
      subject: subject,
      html: message
    });
    console.log('Email sent to:', userEmail);
    transporter.close();
  } catch (error) {
    transporter.close();
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }

};

module.exports = { sendEmail };
