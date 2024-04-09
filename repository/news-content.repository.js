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

const getNewsContentInRange = async (startTime, endTime, wasSent) => {
  try {
    let whereQuery = {
      time: {
        [Sequelize.Op.between]: [startTime, endTime],
      },
    };
    if (wasSent === false) {
      whereQuery = { ...whereQuery, wasSent };
    }
    const newsContentList = await NewsContent.findAll({
      where: whereQuery,
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

const updateSentStatusOfNewsContent = async (newsContentList, status) => {
  try {
    const newsContentIds = newsContentList.map((newsContent) => newsContent.id);
    const updateResult = await NewsContent.update(
      { wasSent: status },
      { where: { id: newsContentIds } }
    );
    console.info(
      `Updated ${updateResult[0]} News Content instances with wasSent as ${status}`
    );
  } catch (err) {
    console.error(`Error in updating the wasSent status`, error);
    throw error;
  }
};

module.exports = {
  addNewsContent,
  getNewsContentInRange,
  updateSentStatusOfNewsContent,
};
