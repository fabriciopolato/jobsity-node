const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
const sendEmail = async (options) => {
  const message = {
    from: '<hellen.schaefer@ethereal.email>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  return transporter.sendMail(message);
};

module.exports = sendEmail;
