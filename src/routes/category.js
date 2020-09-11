const express = require('express')

const Route = express.Router()

const { getAllCategory, getDetailCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { authentication, authorization } = require('../helpers/auth')

Route
  .get('/', getAllCategory)
  .get('/:id', getDetailCategory)
  .post('/', insertCategory)
  .patch('/:id', updateCategory)
  .delete('/:id', deleteCategory)

module.exports = Route
