const express = require("express");
const MaterialsRouter = express.Router();

const MaterialsController = require('./controllers/meterials.controller.js');

MaterialsRouter.get("/", MaterialsController.list);
MaterialsRouter.get("/:materialName", MaterialsController.get);

module.exports = MaterialsRouter;