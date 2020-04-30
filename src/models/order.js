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
                      if (transaction == 0) { connection.query("INSERT INTO `purchase` (purchase_id, user, total) VALUES ('" + data.purchase_id + "', '" + data.user + "', '" + data.total + "')") } 
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
  readOrder: (id) => {
      return new Promise((resolve, reject) => {
          if (id != null){
              connection.query('SELECT purchase_detail.*, purchase.user, user.name AS user, product.name AS product FROM purchase_detail INNER JOIN purchase ON purchase.purchase_id = purchase_detail.purchase_id INNER JOIN user ON user.id = purchase.user INNER JOIN product ON product.id = purchase_detail.product_id WHERE purchase.purchase_id = ?', id, (error, result) => {
                  if (error) reject(new Error(error))
                  resolve(result)
              })
          } else{
            connection.query('SELECT purchase.*, user.name AS user FROM purchase INNER JOIN user ON user.id = purchase.user', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
          }
      })
  },
  chartOrder: (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT SUM(total) AS total, DATE_FORMAT(date_created,'%Y-%m-%d') as date FROM purchase where date_created >= '${startDate}' and date_created <= DATE_ADD('${endDate}', INTERVAL 1 DAY) GROUP BY DATE(date_created)`, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      })
  }
}