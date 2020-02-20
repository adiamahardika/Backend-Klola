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
      connection.query('INSERT INTO category SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateCategory: (data, categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id=?', [data, categoryId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteCategory: (categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', categoryId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
