const userModel = require("../models/user");
const helper = require("../helpers/");
const JWT = require("jsonwebtoken");
const { JWT_KEY, JWT_Refresh } = require("../configs");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { request } = require("express");
const { response } = require("../helpers/");
const tokenList = {};
module.exports = {
  register: async (request, response) => {
    try {
      const emailValid = await userModel.checkEmail(request.body.email);
      const dataUser = emailValid[0];
      if (dataUser === undefined) {
        const salt = helper.generateSalt(18);
        const hashPassword = helper.setPassword(request.body.password, salt);
        const name = request.body.name;
        const id =
          name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9- ]/g, "")
            .split(" ")
            .join("-") +
          "-" +
          uniqid.process();
        const data = {
          id,
          name,
          email: request.body.email,
          status: request.body.status,
          salt: hashPassword.salt,
          password: hashPassword.passwordHash,
          date_created: new Date(),
          date_updated: new Date(),
        };
        const result = await userModel.register(data);
        miscHelper.response(response, 200, result);
      } else {
        miscHelper.customErrorResponse(
          response,
          404,
          "Your email has already registered!"
        );
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  login: async (request, response) => {
    const emailValid = await userModel.checkEmail(request.body.email);
    const dataUser = emailValid[0];
    if (dataUser == emailValid[0]) {
      const data = {
        email: request.body.email,
        password: request.body.password,
      };
      const hashPassword = helper.setPassword(data.password, dataUser.salt);
      if (hashPassword.passwordHash === dataUser.password) {
        const user = {
          email: dataUser.email,
          id: dataUser.id,
        };
        const token = JWT.sign(user, JWT_KEY, { expiresIn: "3h" });
        const refresh_token = JWT.sign(user, JWT_Refresh, { expiresIn: "7d" });

        delete dataUser.salt;
        delete dataUser.password;

        dataUser.token = token;
        dataUser.refresh_token = refresh_token;

        tokenList[dataUser.email] = dataUser;
        miscHelper.response(response, 200, dataUser);
      } else {
        return miscHelper.customErrorResponse(
          response,
          404,
          "Your password is incorrect!"
        );
      }
    } else {
      return miscHelper.customErrorResponse(
        response,
        404,
        "Your email is incorrect!"
      );
    }
  },
  token: async (request, response) => {
    const setData = request.body;
    if (setData.refresh_token === tokenList[setData.email].refresh_token) {
      const user = {
        email: tokenList.email,
        id: tokenList.id,
      };
      const token = JWT.sign(user, JWT_KEY, { expiresIn: "3h" });

      tokenList[setData.email].token = token;

      miscHelper.response(response, 200, tokenList[setData.email]);
    } else {
      return miscHelper.customErrorResponse(
        response,
        404,
        "Cannot refresh token!"
      );
    }
  },
  getAllUser: async (request, response) => {
    try {
      const id = request.params.id || null;
      const name = request.query.name || "";
      const status = parseInt(request.query.status) || "";
      const sort_by = request.query.sort_by || "name";
      const order_by = request.query.order_by || "ASC";
      const result = await userModel.getAllUser(
        id,
        name,
        status,
        sort_by,
        order_by
      );
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  updateUser: async (request, response) => {
    try {
      const data = {
        name: request.body.name,
        email: request.body.email,
        status: request.body.status,
        date_updated: new Date(),
      };
      const id = request.params.id;
      const result = await userModel.updateUser(data, id);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  deleteUser: async (request, response) => {
    try {
      const id = request.params.id;
      const result = await userModel.deleteUser(id);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
};
