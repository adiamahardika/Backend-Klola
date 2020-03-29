const connection = require('../configs/mysql')

module.exports = {
  getAllCategory: (searchName) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM category WHERE name LIKE '%${searchName}%'`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  getDetailCategory: (categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE id = ?', categoryId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE category AUTO_INCREMENT = 0')
      connection.query('INSERT INTO category SET ?', data)
      connection.query(`SELECT * FROM category`,(error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateCategory: (data, categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id=?', [data, categoryId])
      connection.query(`SELECT * FROM category`,(error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteCategory: (idCategory) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', idCategory)
      connection.query(`SELECT * FROM category`,(error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE category DROP id')
        connection.query('ALTER TABLE category ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}
