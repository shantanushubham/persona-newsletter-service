const { Sequelize } = require("sequelize");
const NewsContent = require("../model/newsContent");

/**
 *
 * @param {*} newsContentData The news content data which is to be added.
 * @returns the added News Content Data
 */
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

/**
 *
 * @param {*} startTime the startTime of the range for the news contents
 * @param {*} endTime the endTime of the range for news contents
 * @param {*} wasSent the status of the news content
 * @param {*} topic the topic of the news content that is required. It is an optional field.
 * @returns the list of news contents which match the given conditions
 */
const getNewsContentInRange = async (startTime, endTime, wasSent, topic) => {
  try {
    let whereQuery = {
      time: {
        [Sequelize.Op.between]: [startTime, endTime],
      },
    };
    if (wasSent === false) {
      whereQuery = { ...whereQuery, wasSent };
    }
    if (topic) {
      whereQuery = { ...topic };
    }
    const newsContentList = await NewsContent.findAll({
      where: whereQuery,
    });
    console.info(`Found ${newsContentList.length} news contents`);
    return newsContentList;
  } catch (error) {
    console.error(
      "Error getting NewsContent objects within the given range:",
      error
    );
    throw error;
  }
};

/**
 *
 * @param {*} newsContentList the list of news content instances whose wasSent status is to change.
 * @param {*} status the status that the news contents will be updated to.
 */
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
