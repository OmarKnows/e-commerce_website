const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, template) => {
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
    from: '"Ebra w Fatla Website 💉" <sherifismail44@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `${subject}`, // Subject line
    text: "Hello world?", // plain text body
    html: template, // html body
  });
};

module.exports = sendEmail;
