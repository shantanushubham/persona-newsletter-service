const subscriberService = require("../service/subscriber.service");

const addSubscriber = async (req, res, next) => {
  try {
    const subscriberInfo = { ...req.body };
    const subscriber = await subscriberService.addSubscriber(subscriberInfo);
    return res.status(200).send(subscriber);
  } catch (error) {
    console.error(`Error adding the subscriber`, error);
    return res.status(400).send({
      message: "Failed to add subscriber",
    });
  }
};

module.exports = { addSubscriber };
