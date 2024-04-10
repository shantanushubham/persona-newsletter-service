const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
const { TopicEnum } = require("./topic");

/**
 * This model represents the News Content that a subscriber
 * will subscribe to
 */
const NewsContent = sequelize.define("news_content", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  topic: {
    type: Sequelize.ENUM(...Object.values(TopicEnum)),
    allowNull: false,
  },
  time: {
    type: Sequelize.DATE,
    defaultValue: () => new Date(Date.now() + 2 * 60 * 60 * 1000),
    validate: {
      isAfterCurrentDate(value) {
        if (value <= new Date()) {
          throw new Error("Time must be after the current date");
        }
      },
    },
    allowNull: false,
  },
  wasSent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = NewsContent;
