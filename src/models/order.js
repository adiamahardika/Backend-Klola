// require('dotenv').config()
// const connection = require('../configs/mysql')

// module.exports = {

//   getAllOrder: (limit, page, searchName, sortBy, orderBy, product_id) => {
//     const firstData = ((limit * page) - limit)
//     return new Promise((resolve, reject) => {
//       if (product_id == null) {
//         connection.query(`SELECT order_product.order_id, order_product.product_id, order_product.category_id, order_product.quantity, order_product.price, order_product.total, order_product.date_created FROM order_product INNER JOIN product ON product.id = order_product.product_id
//         WHERE order_product.product_id LIKE '%${searchName}%'
//         ORDER BY ${sortBy} ${orderBy}
//         LIMIT ${firstData},${limit}`,
//         (error, result) => {
//           if (error) reject(new Error(error))
//           resolve(result)
//         })
//       } else {
//         connection.query(`SELECT order_product.order_id, order_product.product_id, order_product.category_id, order_product.quantity, order_product.price, order_product.total, order_product.date_created FROM order_product INNER JOIN product ON product.id = order_product.product_id
//         WHERE order_product.product_id = ?`, product_id, (error, result) => {
//           if (error) reject(new Error(error))
//           resolve(result)
//         })
//       }
//     })
//   },

//   insertOrder: (dataOrder) => {
//     return new Promise((resolve, reject) => {
//       connection.query('SELECT * FROM product WHERE id = ?', dataOrder.product_id, (error, result) => {
//         if (result.length > 0 && result[0].quantity > dataOrder.quantity) {
//           connection.query('UPDATE product SET quantity = ? WHERE id = ?', [result[0].quantity - dataOrder.quantity, result[0].id])
//           connection.query('INSERT INTO order_product SET ?', dataOrder, (error, result) => {
//             if (error) reject(new Error(error))
//             resolve(result)
//           })
//         } else {
//           reject(new Error('quantity not amount', error))
//         }
//       })
//     })
//   }
// }


const connection = require('../configs/mysql')

module.exports = {
  InsertOrderDetail: (data_detail) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE id = ?', data_detail.product_id, (error, result) => { 
        if (error) reject(new Error(error))
        connection.query("INSERT INTO `detail_order` (`order_id`, `product_id`, `quantity`) VALUES ('" + data_detail.order_id + "','" + data_detail.product_id + "','" + data_detail.quantity + "')", (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      })
    })
  },
  newInsertOrder: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO `order` (`order_id`, `total`, `date_created`) VALUES ('" + data.order_id + "','" + data.total_price + "','" + data.date_created + "')", (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertOrder: (data, transaction, date) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE id = ?', data.product_id, (error, result) => {
        if (error) reject(new Error(error)) 
        else {
          var quantity = result[0].quantity - data.quantity
          var price = result[0].price * data.quantity

          if (transaction === 0) { connection.query(`INSERT INTO order SET ?, order_id = ${data.order_id}, total_price=0`, date) }

          connection.query(`UPDATE product SET quantity = ${quantity} WHERE id = ${data.product_id}`, (error, result) => {
            if (error) {reject(new Error(error))}
            else {
            connection.query(`INSERT INTO detail_order SET ?, price = ${price}`, data, (error, result) => {
              if (error) reject(new Error(error))
              connection.query(`SELECT sum(price) as newPrice FROM detail_order WHERE order_id=${data.order_id}`, (error, result) => {
                if (error) reject(new Error(error))
                const total_price = result[0].newPrice
                connection.query(`UPDATE order SET total_price = ${total_price} WHERE order_id = ${data.order_id}`, (error, result) => {
                  if (error) reject(new Error(error))
                  resolve(result)
                  })
                })
              })
            }
          })
        } 
      })
    })
  }
}



module.exports = {
  insertOrder: (data, transaction) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE id = ?', data.product_id, (error, result) => {
        if (result.length > 0) { // CHECK ID PRODUCT (STEP 1)
          // ==========================================
          // GET QUANTITY, PRICE, ID FROM PRODUCT
          // ==========================================
          const checkQuantity = result[0].quantity - data.quantity
          const checkPrice = result[0].price * data.quantity
          const checkProduct_id = result[0].id
          // ==========================================
          if (checkQuantity >= 0) { // CHECK quantity PRODUCT (STEP 2)
            connection.query('UPDATE product SET quantity = ? WHERE id = ?', [checkQuantity, checkProduct_id]) // REDUCE DATA QUANTITY PRODUCT (STEP 3)
            if (transaction === 0) { connection.query("INSERT INTO `order` (id, user_id) VALUES ('" + data.order_id + "', '" + data.user_id + "')") } // INSERT DATA USER_ID TO ORDER (STEP 4), LOOP HERE!
            connection.query('SELECT * FROM `order` WHERE id', (error, result) => {
              // ==========================================
              // GET ID ORDER
              // ==========================================
              const checkOrderId = result[0].id
              // ==========================================
              connection.query("INSERT INTO detail_order (order_id, product_id, quantity, price) VALUES ('" + checkOrderId + "', '" + data.product_id + "', '" + data.quantity + "', '" + checkPrice + "')") // INSERT DATA ORDER DETAIL (STEP 5)
              connection.query('SELECT sum(price) as total FROM order_detail WHERE order_id = ?', checkOrderId, (error, result) => {
                // ==========================================
                // GET TOTAL FROM PRICE ORDER DETAIL
                // ==========================================
                const checkTotal = result[0].total
                // ==========================================
                connection.query('UPDATE `order` SET total = ? WHERE id = ?', [checkTotal, checkOrderId], (error, result) => { //  INSERT DATA TOTAL TO ORDER (STEP 6)
                  if (error) reject(new Error(error))
                  resolve(result) // TAMPILKAN (STEP 7)
                })
                if (error) reject(new Error(error))
              })
              if (error) reject(new Error(error))
            })
          } else {
            console.log('Cannot Reduce quantity Product, Below  0 (-1, -2, -3)!')
            reject(new Error(error))
          }
        } else {
          console.log('ID Product Not Found!')
          reject(new Error(error))
        }
        if (error) reject(new Error(error))
      })
    })
  }
}
