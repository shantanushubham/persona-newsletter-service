const express = require("express");
const app = express();
require("./database-sync")

const newsContentRouter = require("./route/news-content.route");
const subscriberRouter = require("./route/subscriber.route");

app.use(express.json());

app.use("/subscriber", subscriberRouter);
app.use("/news_content", newsContentRouter);

const PORT = 7575;
app.listen(PORT, () => {
  console.log(`The Server is running at PORT: ${PORT}`);
});
