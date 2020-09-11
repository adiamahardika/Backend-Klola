const express = require('express')
const Route = express.Router()

const { getAllProduct, insertProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { authentication, authorization } = require('../helpers/auth')
const uploadFiles = require('../controllers/pictures')

Route
  .get('/:id',  getAllProduct)
  .get('/', getAllProduct)
  .post('/', uploadFiles, insertProduct)
  .patch('/:id', uploadFiles, updateProduct)
  .delete('/:id', deleteProduct)

module.exports = Route
