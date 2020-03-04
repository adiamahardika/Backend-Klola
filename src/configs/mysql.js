const { database } = require('./index')

const mysql = require('mysql')

const connection = mysql.createConnection(database)

connection.connect((error) => {
  if (error) {
    console.log('Connection to Database has Failed!')
  } else {
    console.log('Database Connected!')
  }
})

module.exports = connection
