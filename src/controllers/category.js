const categoryModel = require('../models/category')
const miscHelper = require('../helpers')
const uniqid = require("uniqid")
module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const searchName = request.query.name || ''
      const result = await categoryModel.getAllCategory(searchName)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  getDetailCategory: async (request, response) => {
    try {
      const id = request.params.id
      const result = await categoryModel.getDetailCategory(id)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  insertCategory: async (request, response) => {
    try {
      const id = uniqid.process()
      const data = {
        id,
        name: request.body.name,
        date_created: new Date(),
        date_updated: new Date()
      }
      const result = await categoryModel.insertCategory(data)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateCategory: async (request, response) => {
    try {
      const id = request.params.id
      const data = {
        name: request.body.name,
        date_updated: new Date()
      }
      const result = await categoryModel.updateCategory(data, id)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const id = request.params.id
      const result = await categoryModel.deleteCategory(id)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
