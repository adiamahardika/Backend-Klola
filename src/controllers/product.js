const productModel = require("../models/product");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const filesystem = require("fs").promises;
const deleteFile = async (id) => {
  const checkId = await productModel.checkId(id);
  const data = checkId[0];
  if (data !== undefined) {
    const path = data.image.replace(
      `http://${ip}`,
      `../Backend-Point-Of-Sales`
    );
    await filesystem.unlink(path);
  }
};
module.exports = {
  getAllProduct: async (request, response) => {
    try {
      const id = request.params.id || null;
      const search_name = request.query.name || "";
      const search_category = request.query.category || "";
      const sort_by = request.query.sort_by || "name";
      const order_by = request.query.order_by || "ASC";
      const total_data = await productModel.countData(
        id,
        search_name,
        search_category,
        sort_by,
        order_by
      );
      const limit = parseInt(request.query.limit) || 100;
      const page = parseInt(request.query.page) || 1;
      const start_index = (page - 1) * limit;
      const pagination = {
        total_data,
        page,
        limit,
        start_index,
      };
      const result = await productModel.getAllProduct(
        id,
        search_name,
        search_category,
        sort_by,
        order_by,
        start_index,
        limit,
      );
      miscHelper.customResponsePagination(response, 200, result, pagination);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  insertProduct: async (request, response) => {
    try {
      const id = uniqid.process();
      const data = {
        id,
        name: request.body.name,
        description: request.body.description,
        image: `http://${ip}/pictures/${request.file.filename}`,
        quantity: request.body.quantity,
        price: request.body.price,
        category: request.body.category,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await productModel.insertProduct(data);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  updateProduct: async (request, response) => {
    try {
      const id = request.params.id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          name: request.body.name,
          description: request.body.description,
          quantity: request.body.quantity,
          price: request.body.price,
          category: request.body.category,
          date_updated: new Date(),
        };
        const result = await productModel.updateProduct(data, id);
        miscHelper.response(response, 200, result);
      } else {
        await deleteFile(id);
        const data = {
          name: request.body.name,
          description: request.body.description,
          image: `http://${ip}/pictures/${request.file.filename}`,
          quantity: request.body.quantity,
          price: request.body.price,
          category: request.body.category,
          date_updated: new Date(),
        };
        const result = await productModel.updateProduct(data, id);
        miscHelper.response(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const id = request.params.id;
      await deleteFile(id);
      const result = await productModel.deleteProduct(id);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
};
