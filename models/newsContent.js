const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
const { TopicEnum } = require("./topic");

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
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  wasSent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = NewsContent;
