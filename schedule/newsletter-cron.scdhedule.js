const cron = require("node-cron");
const newsContentService = require("../service/news-content.service");
const emailService = require("../service/email.service");

const scheduledEmailSending = async () => {
  console.info(`Starting Scheduled Email Sending`);
  const newsContentList = await newsContentService.getNewsContentInRange();
  emailService.sendEmailsToSubscribers(newsContentList);
  console.info(`Ending Scheduled Email Sending`);
};

cron.schedule("0 * * * *", scheduledEmailSending);
