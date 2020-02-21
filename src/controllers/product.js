const productModel = require('../models/product')
const miscHelper = require('../helpers')

const { port } = require('../configs')

module.exports = {
  getAllProduct: async (request, response) => {
    try {
      const limit = request.query.limit || 25
      const page = request.query.page || 1
      const searchName = request.query.name || ''
      const sortBy = request.query.sortBy || 'id'
      const orderBy = request.query.orderBy || 'asc'
      const result = await productModel.getAllProduct(limit, page, searchName, sortBy, orderBy)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  getDetailProduct: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.getDetailProduct(productId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  insertProduct: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        description: request.body.description,
        image: `http://localhost:${port}/pictures/${request.file.filename}`,
        quantity: request.body.quantity,
        price: request.body.price,
        category: request.body.category,
        date_created: new Date(),
        date_updated: new Date()
      }
      const result = await productModel.insertProduct(data)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateProduct: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        description: request.body.description,
        quantity: request.body.quantity,
        price: request.body.price,
        category: request.body.category,
        date_updated: new Date()
      }
      const productId = request.params.productId
      const result = await productModel.updateProduct(data, productId)
      miscHelper.response(response, 200, result)
      console.log(result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.deleteProduct(productId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
