const express = require('express')
const Route = express.Router()

const { getAllProduct, insertProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { authentication, authorization } = require('../helpers/auth')
const uploadFiles = require('../controllers/pictures')

Route
  .get('/:productId',  authentication, authorization, getAllProduct)
  .get('/', authentication, authorization, getAllProduct)
  .post('/', authentication, authorization, uploadFiles, insertProduct)
  .patch('/:productId', authentication, authorization, uploadFiles, updateProduct)
  .delete('/:productId', authentication, authorization, deleteProduct)

module.exports = Route
