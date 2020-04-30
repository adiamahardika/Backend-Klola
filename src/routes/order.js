const express = require('express')
const Route = express.Router()

const { orderProduct, readOrder, chartOrder } = require('../controllers/order')
const { authentication, authorization } = require('../helpers/auth')
Route
  .post('/', authentication, authorization, orderProduct)
  .get('/history/', authentication, authorization, readOrder)
  .get('/history/:id', authentication, authorization, readOrder)
  .get('/chart', authentication, authorization, chartOrder)

module.exports = Route