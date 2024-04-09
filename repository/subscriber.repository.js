const Subscriber = require("../models/subscriber");

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

const getSubscribersBySubscribedTopics = async (topic) => {
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
  getSubscribersBySubscribedTopics,
};
