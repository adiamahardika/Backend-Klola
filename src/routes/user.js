const express = require("express");
const Route = express.Router();

const {
  register,
  login,
  token,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { authentication, authorization } = require("../helpers/auth");
Route.post("/register", register)
  .post("/login", login)
  .post("/token", token)
  .get("/", getAllUser)
  .get("/:userId", getAllUser)
  .patch("/:userId", updateUser)
  .delete("/:userId", deleteUser);

module.exports = Route;
