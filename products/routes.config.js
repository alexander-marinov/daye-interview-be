const express = require("express");
const ProductsRouter = express.Router();

const ProductsController = require('./controllers/products.controller.js');

ProductsRouter.get("/", ProductsController.list);
ProductsRouter.get("/:prodId", ProductsController.get);

module.exports = ProductsRouter;