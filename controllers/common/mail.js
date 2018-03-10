const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  tls: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.send = async options => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: options.user.email,
    subject: options.subject,
    html: `You requested a password reset.
           To do this visit this link: <b>${
      options.resetURL
      }</b>`,
    text: `You requested a password reset.
    To do this visit this link: <b>${
      options.resetURL
      }</b>`,
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
