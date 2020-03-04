// const express = require('express')
// const Route = express.Router()

// const { insertOrder, getAllOrder } = require('../controllers/order')

// Route
//   .post('/', insertOrder)
//   .get('/', getAllOrder)
//   .get('/:product_id', getAllOrder)

// module.exports = Route
const express = require('express')
const route = express.Router()

const { insertOrder, newInsertOrder } = require('../controllers/order')

route
    // .post('/', insertOrder)
    .post('/', newInsertOrder)

module.exports = route