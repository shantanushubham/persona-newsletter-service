const subscriberRepository = require("../repository/subscriber.repository");
const newsContentService = require("./news-content.service");
const emailService = require("./email.service");

/**
 * Adds the subscriber. Also sends the email to this new subscriber if
 * there are news contents that should be delivered to this subscriber but
 * is out of scope of cron because added after respective cron run.
 *
 * @param {*} subscriberInfo The subscriber info to be added.
 * @returns the newly added subscriber
 */
const addSubscriber = async (subscriberInfo) => {
  const subscriber = await subscriberRepository.addSubscriber(subscriberInfo);
  const createdAt = subscriber.createdAt;
  if (createdAt.getMinutes() > 0 && createdAt.getMinutes() < 30) {
    const endTime = new Date(createdAt).setMinutes(30);
    const newsContentList = await newsContentService.getNewsContentInRange(
      createdAt,
      endTime,
      subscriber.subscribedTopic
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

/**
 * Gets the list of subscribers with a given topic.
 *
 * @param {*} topic the topic for which subscribers are needed
 * @returns the list of subscribers subscribed to the given topic.
 */
const getSubscribersBySubscribedTopic = async (topic) => {
  return subscriberRepository.getSubscribersBySubscribedTopic(topic);
};

module.exports = { addSubscriber, getSubscribersBySubscribedTopic };
