const Subscriber = require("../model/subscriber");

/**
 * 
 * @param {*} subscriberData The info of the subscriber that is to be added.
 * @returns The added subscriber.
 */
const addSubscriber = async (subscriberData) => {
  try {
    const newSubscriber = await Subscriber.create({ ...subscriberData });
    console.info(
      `Subscriber with email: ${newSubscriber.email} and subscribed topic ${newSubscriber.topic} successfully`
    );
    return newSubscriber;
  } catch (error) {
    console.error(`Error adding subscriber:`, error);
    throw error;
  }
};

/**
 * 
 * @param {*} topic The topic whose subscribers are required. 
 * @returns the list of subscribers who are subscribed to the topic.
 */
const getSubscribersBySubscribedTopic = async (topic) => {
  try {
    const subscribers = await Subscriber.findAll({
      where: {
        subscribedTopic: topic,
      },
    });
    console.info(`Found ${subscribers.length} subscribers by the given topics`);
    return subscribers;
  } catch (error) {
    console.error("Error getting subscribers by subscribed topics:", error);
    throw error;
  }
};

module.exports = {
  addSubscriber,
  getSubscribersBySubscribedTopic,
};
