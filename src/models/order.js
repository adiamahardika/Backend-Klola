const connection = require('../configs/mysql')
module.exports = {
  orderProduct: (data, transaction) => {
      return new Promise((resolve, reject) => {
          connection.query("ALTER TABLE purchase_detail AUTO_INCREMENT=0")
          connection.query("SELECT * FROM product WHERE id = ?", data.id, (error, result) => {
              if (error) reject(new Error(error))
              if (result.length > 0) { 
                  let checkQuantity = result[0].quantity - data.quantity
                  let checkProductId = result[0].id
                  if (checkQuantity >= 0) {
                      connection.query("UPDATE product SET quantity = ? WHERE id = ?", [checkQuantity, checkProductId]) 
                      if (transaction == 0) { connection.query("INSERT INTO `purchase` (purchase_id, user_id, total) VALUES ('" + data.purchase_id + "', '" + data.user_id + "', '" + data.total + "')") } 
                      connection.query("INSERT INTO purchase_detail (purchase_id, product_id, quantity) VALUES ('" + data.purchase_id + "', '" + data.id + "', '" + data.quantity + "')", (error, result) => {
                          if (error) reject(new Error(error))
                          resolve(result)
                      })
                  } else {
                      console.log('Cannot Reduce Stock Product, Below  0 (-1, -2, -3)!')
                      reject(new Error(error))
                  }
              } else {
                  console.log('ID Product Not Found!')
                  reject(new Error(error))
              }
          })
      })
  },
  readOrder: () => {
      return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM `purchase`', (error, result) => {
              if (error) reject(new Error(error))
              resolve(result)
          })
      })
  }
}