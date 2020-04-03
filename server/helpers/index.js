const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@l'amour-de-la-famille.com" };

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "theemodernentrepreneur@gmail.com",
      pass: "4thTechies"
    }
  });
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};