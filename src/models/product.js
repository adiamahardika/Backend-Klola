const connection = require('../configs/mysql')

module.exports = {
  getAllProduct: (limit, page, searchName, sortBy, orderBy) => {
    return new Promise((resolve, reject) => {
      const firstData = ((limit * page) - limit)
      connection.query(`SELECT product.id, product.name, product.description, product.image, product.price, product.quantity, category.name as category, product.date_created, product.date_updated FROM product INNER JOIN category ON product.category = category.id
      WHERE product.name LIKE '%${searchName}%'
      ORDER BY ${sortBy} ${orderBy}
      LIMIT ${firstData},${limit}`,
      (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  getDetailProduct: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product.id, product.name, product.description, product.image, product.price, product.quantity, category.name as category, product.date_created, product.date_updated FROM product INNER JOIN category ON product.category = category.id
      WHERE product.id = ?`, productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateProduct: (data, productId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE id = ?', [data, productId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', productId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}