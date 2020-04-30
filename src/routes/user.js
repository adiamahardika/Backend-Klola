const express = require('express')
const Route = express.Router()

const { register, login, getAllUser, updateUser, deleteUser } = require('../controllers/user')
const { authentication, authorization } = require('../helpers/auth')
Route
  .post('/register', register)
  .post('/login', login)
  .get('/', authentication, authorization, getAllUser)
  .get('/:userId', authentication, authorization, getAllUser)
  .patch('/:userId', authentication, authorization, updateUser)
  .delete('/:userId', authentication, authorization, deleteUser)

module.exports = Route
