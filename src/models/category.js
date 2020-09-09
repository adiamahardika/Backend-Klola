const connection = require('../configs/mysql')
const readQuery = `SELECT * FROM category ORDER BY name ASC` 
module.exports = {
  getAllCategory: (searchName) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM category WHERE name LIKE '%${searchName}%' ORDER BY name ASC`, (error, result) => {
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
      connection.query('INSERT INTO category SET ?', data)
      connection.query(readQuery,(error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateCategory: (data, categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id=?', [data, categoryId])
      connection.query(readQuery,(error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteCategory: (idCategory) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM category WHERE id = ?', idCategory)
      connection.query(readQuery,(error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
