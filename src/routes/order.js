const express = require('express')
const Route = express.Router()

const { orderProduct, readOrder } = require('../controllers/order')

Route
  .post('/', orderProduct)
  .get('/', readOrder)
//   .get('/:product_id', readOrder)

module.exports = Route
// const express = require('express')
// const route = express.Router()

// const { insertOrder, newInsertOrder } = require('../controllers/order')

// route
//     // .post('/', insertOrder)
//     .post('/', newInsertOrder)

// module.exports = route