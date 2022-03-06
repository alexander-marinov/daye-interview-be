const express = require("express");
const OrdersRouter = express.Router();

const OrdersController = require('./controllers/orders.controller.js');

OrdersRouter.post("/", OrdersController.execute);

module.exports = OrdersRouter;