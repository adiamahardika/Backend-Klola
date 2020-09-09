const uniqid = require("uniqid");
const orderModel = require("../models/order");
const miscHelper = require("../helpers");
const moment = require("moment");

module.exports = {
  orderProduct: async (request, response) => {
    try {
      const orderProduct = request.body;
      var transaction = 0;
      let purchase_id = uniqid();
      await orderProduct.product.map((event) => {
        const data = {
          purchase_id,
          user: orderProduct.user,
          total: orderProduct.total,
          id: event.id,
          quantity: event.qty,
        };
        orderModel.orderProduct(data, transaction);
        transaction++;
      });
      const result = await orderModel.readOrder();
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Order Product Failed!");
    }
  },
  readOrder: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await orderModel.readOrder(id);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Read Order Failed!");
    }
  },
  chartOrder: async (request, response) => {
    try {
      const date = new Date();
      const start = request.query.start || date;
      const end = request.query.end || date;
      const startDate = moment(new Date(start)).format("YYYY-MM-DD");
      const endDate = moment(new Date(end)).format("YYYY-MM-DD");
      const result = await orderModel.chartOrder(startDate, endDate);
      response.json(result);
    } catch (error) {
      console.log(error);
    }
  },
};
