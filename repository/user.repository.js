const User = require("../models/user");

const addUser = async (userData) => {
  try {
    const newUser = await User.create({ ...userData });
    console.info(
      `User with email: ${newUser.email} and subscribed topic ${newUser.topic} successfully`
    );
    return newUser;
  } catch (error) {
    console.error(`Error adding user:`, error);
    throw error;
  }
};

const getUsersBySubscribedTopics = async (topic) => {
  try {
    const users = await User.findAll({
      where: {
        subscribedTopic: topic,
      },
    });
    console.info(`Found ${users.length} users by the given topics`);
    return users;
  } catch (error) {
    console.error("Error getting users by subscribed topics:", error);
    throw error;
  }
};

module.exports = {
  addUserToDb: addUser,
  getUsersBySubscribedTopics,
};
