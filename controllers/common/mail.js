const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');
// const htmlToText = require('html-to-text');
// const juice = require('juice');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.send = async options => {
  const mailOptions = {
    from: 'TimeTracker <noreply@noreply.com>',
    to: options.user.email,
    subject: options.subject,
    html: `You requested a password reset.
           Visit our site and add this to our base link: <b>${
             options.resetURL
           }</b>`,
    text: `You requested a password reset.
           Visit our site and add this to our base link: ${
             options.resetURL
           }</b>`,
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
