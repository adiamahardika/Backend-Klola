const categoryModel = require('../models/category')
const miscHelper = require('../helpers')

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
      const categoryId = request.params.categoryId
      const result = await categoryModel.getDetailCategory(categoryId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  insertCategory: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        date_created: new Date(),
        date_updated: new Date()
      }
      const result = await categoryModel.insertCategory(data)
      data.id = result.insertId
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateCategory: async (request, response) => {
    try {
      const categoryId = request.params.categoryId
      const data = {
        name: request.body.name,
        date_updated: new Date()
      }
      const result = await categoryModel.updateCategory(data, categoryId)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const categoryId = request.params.categoryId
      const idCategory = parseInt(categoryId)
      const result = await categoryModel.deleteCategory(idCategory)
      miscHelper.response(response, 200, result)
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
