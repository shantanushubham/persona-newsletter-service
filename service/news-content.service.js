const newsContentRepository = require("../repository/news-content.repository");

const addNewsContent = async (newsContentInfo) => {
  return await newsContentRepository.addNewsContent(newsContentInfo);
};

module.exports = { addNewsContent };
