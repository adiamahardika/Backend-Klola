const productModel = require('../models/product')
const miscHelper = require('../helpers')
const uuidv1 = require('uuid/v1')
const { port } = require('../configs')

module.exports = {
  getAllProduct: async (request, response) => {
    try {
      const productId = request.params.productId || null

      const limit = request.query.limit || 9
      const page = request.query.page || 1
      const searchName = request.query.name || ''
      const searchCategory = request.query.category || ''
      const sortBy = request.query.sortBy || 'id'
      const orderBy = request.query.orderBy || 'ASC'

      const totalData= await productModel.countData()
      const totalPages = Math.ceil(totalData/limit)
      const pager={
        totalPages
      }
      const result = await productModel.getAllProduct(limit, page, searchName, sortBy, orderBy, productId, searchCategory)
      miscHelper.customResponse(response, 200, result, pager)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  insertProduct: async (request, response) => {
    try {
      const id = uuidv1()
      const data = {
        id,
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
      miscHelper.response(response, 200, data)
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
      miscHelper.response(response, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const productId = request.params.productId
      const result = await productModel.deleteProduct(productId)
      miscHelper.response(response, 200, productId)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
