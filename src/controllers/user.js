const userModel = require('../models/user')
const helper = require('../helpers/')
const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../configs')
const miscHelper = require('../helpers')

module.exports = {
  register: async (request, response) => {
    try {
      const salt = helper.generateSalt(18)
      const hashPassword = helper.setPassword(request.body.password, salt)
      const status = 2
      const data = {
        name: request.body.name,
        email: request.body.email,
        status,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        date_created: new Date(),
        date_updated: new Date()
      }
      const result = await userModel.register(data)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  login: async (request, response) => {
    const data = {
      password: request.body.password,
      email: request.body.email
    }

    const emailValid = await userModel.checkEmail(data.email)
    const dataUser = emailValid[0]
    const hashPassword = helper.setPassword(data.password, dataUser.salt)

    if (hashPassword.passwordHash === dataUser.password) {
      const token = JWT.sign({
        email: dataUser.email,
        id: dataUser.id
      }, JWT_KEY, { expiresIn: '3h' })

      delete dataUser.salt
      delete dataUser.password

      dataUser.token = token
      miscHelper.response(response, 200, dataUser)
    } else {
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  getAllUser: async (request, response) => {
    try {
      const userId = request.params.userId || null
      const name = request.query.name || ''
      const status = request.query.status || ''
      const result = await userModel.getAllUser(userId, name, status)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  updateUser: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        email: request.body.email,
        status: request.body.status,
        date_updated: new Date()
      }
      const userId = request.params.userId
      const result = await userModel.updateUser(data, userId)
      miscHelper.response(response, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
  deleteUser: async (request, response) => {
    try {
      const userId = request.params.userId
      const result = await userModel.deleteUser(userId)
      miscHelper.response(response, 200, userId)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  }
}
