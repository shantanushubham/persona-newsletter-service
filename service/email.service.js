const nodemailer = require("nodemailer");
const { SENDER_EMAIL } = require("../constants");
const subscriberService = require("../service/subscriber.service");
const newsContentService = require("../service/news-content.service");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: SENDER_EMAIL,
    pass: "Some_Password",
  },
});

const sendEmailsToSubscribers = async (newsContentList) => {
  const map = new Map();
  for (const newsContent of newsContentList) {
    let subscribers;
    if (!map.has(newsContent.topic)) {
      subscribers = await subscriberService.getSubscribersBySubscribedTopic(
        newsContent.topic
      );
      map.set(newsContent.topic, subscribers);
    } else {
      subscribers = map.get(newsContent.topic);
    }
    const emailIdList = subscribers.map((subscriber) => subscriber.email);
    sendEmail(
      emailIdList,
      `New Story in ${newsContent.topic}`,
      newsContent.content
    );
  }
  newsContentService.updateSentStatusOfNewsContent(newsContentList);
};

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

module.exports = { sendEmailsToSubscribers, sendEmail };
