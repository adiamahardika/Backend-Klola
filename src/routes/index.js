const express = require('express')
const Route = express.Router()

const productRouter = require('./product')
const categoryRouter = require('./category')
const userRoute = require('./user')

Route
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/pictures', express.static('./pictures'))
  .use('/user', userRoute)

module.exports = Route
