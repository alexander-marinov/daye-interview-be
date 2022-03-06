const config = require('./common/env.config.js');
const ProductsRouter = require('./products/routes.config.js');
const MaterialsRouter = require('./meterials/routes.config.js');
const OrderssRouter = require('./orders/routes.config.js');

const express = require('express');
const app = express();

app.use(express.json());
app.use("/products", ProductsRouter);
app.use("/materials", MaterialsRouter);
app.use("/orders", OrderssRouter);

app.listen(config.port, function () {
    console.log('Backend listening at port %s', config.port);
});