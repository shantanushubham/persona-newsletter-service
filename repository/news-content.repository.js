const { Sequelize } = require("sequelize");
const NewsContent = require("../model/newsContent");

const addNewsContent = async (newsContentData) => {
  try {
    const newNewsContent = await NewsContent.create({ ...newsContentData });
    console.info(
      `News Content with topic: ${newNewsContent.topic} was successfully added.`
    );
    return newNewsContent;
  } catch (error) {
    console.error(`Error adding News Content`, error);
    throw error;
  }
};

const getNewsContentInRange = async (startTime, endTime) => {
  if (!startTime) {
    let currentDate = new Date();
    startTime = new Date(currentDate).setMinutes(currentDate.getMinutes() - 30);
    endTime = new Date(currentDate).setMinutes(currentDate.getMinutes() + 30);
  }
  try {
    const newsContentList = await NewsContent.findAll({
      where: {
        time: {
          [Sequelize.Op.between]: [startTime, endTime],
        },
      },
    });
    console.info(`Found ${newsContentList.length} news content`);
    return newsContentList;
  } catch (error) {
    console.error(
      "Error getting NewsContent objects within the given range:",
      error
    );
    throw error;
  }
};

module.exports = {
  addNewsContent,
  getNewsContentInRange,
};
