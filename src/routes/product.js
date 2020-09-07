const express = require('express')
const Route = express.Router()

const { getAllProduct, insertProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { authentication, authorization } = require('../helpers/auth')
const uploadFiles = require('../controllers/pictures')

Route
  .get('/:productId',  getAllProduct)
  .get('/', getAllProduct)
  .post('/', uploadFiles, insertProduct)
  .patch('/:productId', uploadFiles, updateProduct)
  .delete('/:productId', deleteProduct)

module.exports = Route
