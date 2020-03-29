const uniqid = require('uniqid')
const orderModel = require('../models/order')
const miscHelper = require('../helpers')

module.exports = {
    orderProduct: async (request, response) => {
        try {
            const orderProduct = request.body
            var transaction = 0

            let purchase_id = uniqid()
            await orderProduct.product.map(event => {
                const data = {
                    purchase_id,
                    user_id: orderProduct.user_id,
                    total: orderProduct.total,
                    id: event.id,
                    quantity: event.quantity,
                }
                orderModel.orderProduct(data, transaction)
                transaction++
            })
            const result = await orderModel.readOrder()
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Order Product Failed!')
        }
    },
    readOrder: async (request, response) => {
        try {
            const result = await orderModel.readOrder()
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Read Order Failed!')
        }
    }
}