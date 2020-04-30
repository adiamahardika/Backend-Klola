const express = require('express')
const Route = express.Router()

const { orderProduct, readOrder, chartOrder } = require('../controllers/order')

Route
  .post('/', orderProduct)
  .get('/history/', readOrder)
  .get('/history/:id', readOrder)
  .get('/chart', chartOrder)

module.exports = Route