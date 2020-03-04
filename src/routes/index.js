const express = require('express')
const Route = express.Router()

const productRouter = require('./product')
const categoryRouter = require('./category')
const userRouter = require('./user')
const orderRouter = require('./order')

Route
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/pictures', express.static('./pictures'))
  .use('/user', userRouter)
  .use('/order', orderRouter)

module.exports = Route
