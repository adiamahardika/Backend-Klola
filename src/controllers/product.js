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
      const productId = request.params.productId || null;
      const limit = request.query.limit || 100;
      const page = request.query.page || 1;
      const searchName = request.query.name || "";
      const searchCategory = request.query.category || "";
      const sortBy = request.query.sortBy || "name";
      const orderBy = request.query.orderBy || "ASC";
      const totalData = await productModel.countData();
      const totalPages = Math.ceil(totalData / limit);
      const pagination = {
        totalPages,
      };
      const result = await productModel.getAllProduct(
        limit,
        page,
        searchName,
        sortBy,
        orderBy,
        productId,
        searchCategory
      );
      miscHelper.CustomResponsePagination(response, 200, result, pagination);
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
      const productId = request.params.productId;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          name: request.body.name,
          description: request.body.description,
          quantity: request.body.quantity,
          price: request.body.price,
          category: request.body.category,
          date_updated: new Date(),
        };
        const result = await productModel.updateProduct(data, productId);
        miscHelper.response(response, 200, result);
      } else {
        await deleteFile(productId);
        const data = {
          name: request.body.name,
          description: request.body.description,
          image: `http://${ip}/pictures/${request.file.filename}`,
          quantity: request.body.quantity,
          price: request.body.price,
          category: request.body.category,
          date_updated: new Date(),
        };
        const result = await productModel.updateProduct(data, productId);
        miscHelper.response(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const productId = request.params.productId;
      await deleteFile(productId);
      const result = await productModel.deleteProduct(productId);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
};
