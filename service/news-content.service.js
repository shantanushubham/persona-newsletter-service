const newsContentRepository = require("../repository/news-content.repository");

/**
 * Adds the news content into the database.
 *
 * @param {*} newsContentInfo The news content info that is to be added
 * @returns the added news content instance
 */
const addNewsContent = async (newsContentInfo) => {
  return await newsContentRepository.addNewsContent(newsContentInfo);
};

/**
 * Gets the list of news content which are in the given time range, with the matching
 * status and topic.
 *
 * @param {*} startTime the startTime of the range for the news contents
 * @param {*} endTime the endTime of the range for news contents
 * @param {*} wasSent the status of the news content. By default it is false
 * @param {*} topic the news content topic we are looking for. It is an optional field.
 * @returns the list of news contents which match the given conditions
 */
const getNewsContentInRange = async (
  startTime,
  endTime,
  wasSent = false,
  topic
) => {
  if (!startTime || !endTime) {
    let currentDate = new Date();
    startTime = new Date(currentDate).setMinutes(currentDate.getMinutes() - 30);
    endTime = new Date(currentDate).setMinutes(currentDate.getMinutes() + 30);
  }
  const newsContentList = await newsContentRepository.getNewsContentInRange(
    startTime,
    endTime,
    wasSent,
    topic
  );
  return newsContentList;
};

/**
 * Updates the news content sent status into the database.
 *
 * @param {*} newsContentList the list of news content instances whose wasSent status is to change.
 * @param {*} status the status that the news contents will be updated to. It is true by default
 */
const updateSentStatusOfNewsContent = async (
  newsContentList,
  status = true
) => {
  await newsContentRepository.updateSentStatusOfNewsContent(
    newsContentList,
    status
  );
};

module.exports = {
  addNewsContent,
  getNewsContentInRange,
  updateSentStatusOfNewsContent,
};
