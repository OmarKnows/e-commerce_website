const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, template) => {
  let smtpConfig = {
    service: "gmail",
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_PASS,
    },
  };
  let transporter = nodemailer.createTransport(smtpConfig);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ebra w Fatla Website 💉" <sherifismail44@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `${subject}`, // Subject line
    text: "Hello world?", // plain text body
    html: template, // html body
  });
};

module.exports = sendEmail;
