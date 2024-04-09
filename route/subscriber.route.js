const express = require("express");
const subscriberController = require("../controller/subscriber.controller");

const subscriberRouter = express.Router();

subscriberRouter.post("/add", subscriberController.addSubscriber);

module.exports = subscriberRouter;
