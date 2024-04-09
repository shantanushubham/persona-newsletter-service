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
  topics: {
    type: Sequelize.ARRAY(Sequelize.ENUM(...Object.values(TopicEnum))),
    allowNull: false,
  },
});

module.exports = NewsContent;
