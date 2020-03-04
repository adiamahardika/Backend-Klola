// const productModel = require('../models/order')
// const miscHelper = require('../helpers')
// const uuidv4 = require('uuid/v4')

// module.exports = {
//   getAllOrder: async (request, response) => {
//     try {
//       const product_id = request.params.product_id || null

//       const limit = request.query.limit || 25
//       const page = request.query.page || 1
//       const searchName = request.query.name || ''
//       const sortBy = request.query.sortBy || 'id'
//       const orderBy = request.query.orderBy || 'ASC'
//       const result = await productModel.getAllOrder(limit, page, searchName, sortBy, orderBy, product_id)
//       miscHelper.response(response, 200, result)
//     } catch (error) {
//       console.log(error)
//       miscHelper.customErrorResponse(response, 404, 'Internal server error!')
//     }
//   },
//   insertOrder: async (request, response) => {
//     try {
//       const order_id = uuidv4()
//       const quantity = request.body.quantity
//       const price = request.body.price
//       const pay = quantity * price
//       const { product_id } = request.body
//       const dataOrder = {
//         order_id,
//         product_id,
//         category_id: request.body.category_id,
//         quantity,
//         price: request.body.price,
//         total: pay,
//         date_created: new Date()
//       }
//       const result = await productModel.insertOrder(dataOrder)
//       miscHelper.response(response, 200, result)
//     } catch (error) {
//       console.log(error)
//       miscHelper.customErrorResponse(response, 404, 'Order failed')
//     }
//   }
// }

const orderModel = require('../models/order')
const helpers = require('../helpers')
const uuid = require('uuid/v4')

module.exports = {
  newInsertOrder: async (request, response) => {
    const order = request.body
    const order_id = uuid()

    order.product.map(event => {
      const data_detail = {
        order_id,
        product_id: event.product_id,
        quantity: event.quantity
      }
      orderModel.InsertOrderDetail(data_detail)
    })
    
    const data = {
      order_id,
      total_price: order.total_price,
      date_created: new Date()
    }
    orderModel.newInsertOrder(data)
    helpers.response(response, 200, 'Thanks!')
  },
  insertOrder: async (request, response) => {
    // const order = request.body
    // if (order === undefined || order === '') return console.log('Data Not Available!!')

    // var transaction = 0
    // await order.product.map(event => {
    //   const data = {
    //     order_id: order.order_id,
    //     productId: event.productId,
    //     quantity: event.quantity
    //   }
    //   const date = {
    //     date_created: new Date()
    //   }
    //   orderModel.insertOrder(data, transaction, date)
    //   transaction++
    // })

    // helpers.response(response, 200, 'Thanks!')
try {
  const order = request.body
  if (order === undefined || order === '') return console.log('Data Not Available!!')

  var transaction = 0
  await order.product.map(event => {
    const data = {
      order_id: order.order_id,
      total_price: event.total_price
      // product_id: event.product_id,
      // quantity: event.quantity
    }
    const date = {
      date_created: new Date()
    }
    orderModel.insertOrder(data, transaction, date)
    transaction++
  })

  helpers.response(response, 200, 'Thanks!')
} catch (error) {
  console.log(error)
  helpers.customErrorResponse(404, 'Your request not found!!')
}
}
}
// const uuidv4 = require('uuid/v4')
// const orderModel = require('../models/order')
// const funcHelpers = require('../helpers')

// module.exports = {
//   orderProduct: async (request, response) => {
//     try {
//       const orderProduct = request.body
//       var loop = 0
//       await orderProduct.product.map(event => {
//         const order_id = uuidv4()
//         const data = {
//           order_id: orderProduct.order_id,
//           user_id: orderProduct.user_id,
//           product_id: event.product_id,
//           quantity: event.quantity
//         }
//         orderModel.orderProduct(data, loop)
//         loop++
//       })
//       funcHelpers.response(response, 200, 'Order Product Success!')
//     } catch (error) {
//       console.log(error)
//       funcHelpers.customErrorResponse(response, 404, 'Order Product Failed!')
//     }
//   }
// }
