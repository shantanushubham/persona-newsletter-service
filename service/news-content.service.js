const newsContentRepository = require("../repository/news-content.repository");

const addNewsContent = async (newsContentInfo) => {
  return await newsContentRepository.addNewsContent(newsContentInfo);
};

const getNewsContentInRange = async (startTime, endTime, wasSent = false) => {
  if (!startTime || !endTime) {
    let currentDate = new Date();
    startTime = new Date(currentDate).setMinutes(currentDate.getMinutes() - 30);
    endTime = new Date(currentDate).setMinutes(currentDate.getMinutes() + 30);
  }
  const newsContentList = await newsContentRepository.getNewsContentInRange(
    startTime,
    endTime,
    wasSent
  );
  return newsContentList;
};

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
