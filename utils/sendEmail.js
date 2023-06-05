const nodemailer = require("nodemailer");
require("dotenv").config;

const sendEmail = (userMail, subiect, textEmail) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: userMail,
    subject: subiect,
    text: textEmail,
  };

  transporter.sendMail(mailOptions, function (error) {
    error && console.log(error);
  });
};

module.exports = sendEmail;
