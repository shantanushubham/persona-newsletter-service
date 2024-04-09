const subscriberRepository = require("../repository/subscriber.repository");
const newsContentService = require("./news-content.service");
const emailService = require("./email.service");

const addSubscriber = async (subscriberInfo) => {
  const subscriber = await subscriberRepository.addSubscriber(subscriberInfo);
  const createdAt = subscriber.createdAt;
  if (createdAt.getMinutes() > 0 && createdAt.getMinutes() < 30) {
    const endTime = new Date(createdAt).setMinutes(30);
    // TODO: Get only those newsContentList that matches the topic user is 
    // subscribed to.
    const newsContentList = await newsContentService.getNewsContentInRange(
      createdAt,
      endTime
    );
    for (const newsContent of newsContentList) {
      emailService.sendEmail(
        [subscriber.email],
        `New Story in ${newsContent.topic}`,
        newsContent.content
      );
    }
  }
  return subscriber;
};

const getSubscribersBySubscribedTopic = async (topic) => {
  return subscriberRepository.getSubscribersBySubscribedTopic(topic);
};

module.exports = { addSubscriber, getSubscribersBySubscribedTopic };
