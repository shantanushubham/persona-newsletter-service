const cron = require("node-cron");
const newsContentService = require("../service/news-content.service");
const emailService = require("../service/email.service");

cron.schedule("0 * * * *", async () => {
  const newsContentList = await newsContentService.getNewsContentInRange();
  emailService.sendEmailsToSubscribers(newsContentList);
});
