const connection = require('../configs/mysql')

module.exports = {
  countData:()=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT count(*) as totalData FROM product', (error, result)=>{
            resolve(result[0].totalData)
        })
    })
},
  getAllProduct: (limit, page, searchName, sortBy, orderBy, productId, searchCategory) => {
    const firstData = ((limit * page) - limit)
    return new Promise((resolve, reject) => {
      if (productId !== null) {
        connection.query(`SELECT product.id, product.name, product.description, product.image, product.price, product.quantity, category.name as category, product.date_created, product.date_updated FROM product INNER JOIN category ON product.category = category.id
        WHERE product.id = ?`, productId, (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      } else {
        connection.query(`SELECT product.id, product.name, product.description, product.image, product.price, product.quantity, category.name as category, product.date_created, product.date_updated FROM product INNER JOIN category ON product.category = category.id
        WHERE product.name LIKE '%${searchName}%' AND category.id LIKE '%${searchCategory}%'
        ORDER BY ${sortBy} ${orderBy}
        LIMIT ${firstData},${limit}`,
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        })
      }
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
