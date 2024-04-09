const nodemailer = require("nodemailer");
const { SENDER_EMAIL } = require("../constants");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: SENDER_EMAIL,
    pass: "Some_Password",
  },
});

const sendEmail = async (emailIdList, subject, text) => {
  let emailsFailed = [];
  for (const email of emailIdList) {
    const mailOptions = {
      from: SENDER_EMAIL,
      to: email,
      subject,
      text,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      emailsFailed.push(email);
    }
  }
  console.info(
    `Sent ${emailIdList.length - emailsFailed.length} emails out of ${
      emailIdList.length
    } successfully.`
  );
  if (emailsFailed.length) {
    console.error(
      `The emails could not be sent to ${emailsFailed.length} emails. They are:`,
      emailsFailed
    );
  }
};

module.exports = { sendEmail };
