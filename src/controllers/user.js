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
      const data = {
        name: request.body.name,
        email: request.body.email,
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
  }
}
