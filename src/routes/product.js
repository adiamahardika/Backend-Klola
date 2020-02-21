const express = require('express')
const Route = express.Router()

const { getAllProduct, getDetailProduct, insertProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { authentication, authorization } = require('../helpers/auth')
const { uploadFiles } = require('../controllers/pictures')

Route
  .get('/', authentication, authorization, getAllProduct)
  .get('/:productId', authentication, authorization, getDetailProduct)
  .post('/', uploadFiles, authentication, authorization, insertProduct)
  .patch('/:productId', authentication, authorization, updateProduct)
  .delete('/:productId', authentication, authorization, deleteProduct)

module.exports = Route
