const connection = require('../configs/mysql')

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE user AUTO_INCREMENT = 0')
      connection.query('INSERT INTO user SET ?', data)
      connection.query('SELECT user.id, user.name, user.email, user.status, user_status.status as status, user.date_created, user.date_updated FROM user INNER JOIN user_status ON user.status = user_status.id', (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ?', email, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  getAllUser: (userId, name, status) => {
    return new Promise((resolve, reject) => {
      if (userId !== null) {
      connection.query(`SELECT user.id, user.name, user.email, user.status, user_status.status as status, user.date_created, user.date_updated FROM user INNER JOIN user_status ON user.status = user_status.id
      WHERE user.id = ?`, userId, (error, result) => {
        if(error) reject(new Error(error))
        resolve(result)
      })
    } else {
      connection.query(`SELECT user.id, user.name, user.email, user.status, user_status.status as status, user.date_created, user.date_updated FROM user INNER JOIN user_status ON user.status = user_status.id
      WHERE user.name LIKE '%${name}' AND user_status.status LIKE '%${status}'`, (error, result) => {
        if(error) reject(new Error(error))
        resolve(result)
      })
      }
    })
  },
  updateUser: (data, userId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE user SET ? WHERE id = ?', [data, userId])
      connection.query('SELECT user.id, user.name, user.email, user.status, user_status.status as status, user.date_created, user.date_updated FROM user INNER JOIN user_status ON user.status = user_status.id',(error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE id = ?', userId)
      connection.query('SELECT user.id, user.name, user.email, user.status, user_status.status as status, user.date_created, user.date_updated FROM user INNER JOIN user_status ON user.status = user_status.id',
        (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE user DROP id')
        connection.query('ALTER TABLE user ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}
