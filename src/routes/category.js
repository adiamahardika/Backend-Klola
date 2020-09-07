const express = require('express')

const Route = express.Router()

const { getAllCategory, getDetailCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { authentication, authorization } = require('../helpers/auth')

Route
  .get('/', getAllCategory)
  .get('/:categoryId', getDetailCategory)
  .post('/', insertCategory)
  .patch('/:categoryId', updateCategory)
  .delete('/:categoryId', deleteCategory)

module.exports = Route
