const nodemailer = require("nodemailer");

function sendEmail(email, mailSubject, body) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: mailSubject,
    html: body,
  };

  transport.sendMail(mailOptions, function (err, result) {
    if (err) {
      console.log("Error in sending email");
      /* console.log("error:", err); */
    } else {
      console.log("Email has been sent");
    }
  });
}

module.exports = { sendEmail };
