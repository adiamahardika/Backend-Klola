const express = require('express')

const Route = express.Router()

const { getAllCategory, getDetailCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { authentication, authorization } = require('../helpers/auth')

Route
  .get('/', authentication, authorization, getAllCategory)
  .get('/:categoryId', authentication, authorization, getDetailCategory)
  .post('/', authentication, authorization, insertCategory)
  .patch('/:categoryId', authentication, authorization, updateCategory)
  .delete('/:categoryId', authentication, authorization, deleteCategory)

module.exports = Route
