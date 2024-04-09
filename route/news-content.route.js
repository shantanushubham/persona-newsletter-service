const express = require("express");
const newsContentController = require("../controller/news-content.controller");

const newsContentRouter = express.Router();

newsContentRouter.post("/add", newsContentController.addNewsContent);

module.exports = newsContentRouter;
