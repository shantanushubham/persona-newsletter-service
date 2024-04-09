const newsContentService = require("../service/news-content.service");

const addNewsContent = async (req, res, next) => {
  try {
    const newsContentInfo = { ...req.body };
    const newsContent = await newsContentService.addNewsContent(
      newsContentInfo
    );
    return res.status(200).send(newsContent);
  } catch (error) {
    console.error(`Error adding the news content`);
    return res.status(400).send({
      message: "Failed to add news content",
    });
  }
};

module.exports = { addNewsContent };
