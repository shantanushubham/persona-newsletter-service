const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
const { TopicEnum } = require("./topic");

/**
 * This model represents the subscriber who will subscribe a certain topic
 * of news contents.
 */
const Subscriber = sequelize.define("subscriber", {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  subscribedTopic: {
    type: Sequelize.ENUM(...Object.values(TopicEnum)),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

module.exports = Subscriber;
