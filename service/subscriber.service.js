const subscriberRepository = require("../repository/subscriber.repository");

const addSubscriber = async (subscriberInfo) => {
  const subscriber = await subscriberRepository.addUser(subscriberInfo);
  const createdAt = subscriber.createdAt;
  if (createdAt.getMinutes() > 0 && createdAt.getMinutes() < 30) {
    // TODO: Find news content in range and send emails.
  }
  return subscriber;
};

module.exports = { addSubscriber };
