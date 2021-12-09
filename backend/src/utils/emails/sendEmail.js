const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, link) => {
  let smtpConfig = {
    service: "gmail",
    auth: {
      user: "sherifismail44@gmail.com",
      pass: "allahraby",
    },
  };
  let transporter = nodemailer.createTransport(smtpConfig);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <sherifismail44@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `${subject} ✔`, // Subject line
    text: "Hello world?", // plain text body
    html: ` <b>reset password link -> <a href="${link}">link</a> </b>`, // html body
  });
};

module.exports = sendEmail;
