const express = require('express')
const Route = express.Router()

const { orderProduct, readOrder, chartOrder } = require('../controllers/order')
const { authentication, authorization } = require('../helpers/auth')
Route
  .post('/', orderProduct)
  .get('/history/', readOrder)
  .get('/history/:id', readOrder)
  .get('/chart', chartOrder)

module.exports = Route