const express = require('express')
const Route = express.Router()

const { orderProduct, readOrder } = require('../controllers/order')

Route
  .post('/', orderProduct)
  .get('/', readOrder)

module.exports = Route