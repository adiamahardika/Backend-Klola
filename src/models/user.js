const connection = require("../configs/mysql");
const readQuery = `SELECT user.id, user.name, user.email, user.status, user_status.status as status_name, user.date_created, user.date_updated FROM user LEF JOIN user_status ON user.status = user_status.id ORDER BY name ASC`;
module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email = ?",
        email,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  getAllUser: (userId, name, status) => {
    return new Promise((resolve, reject) => {
      if (userId !== null) {
        connection.query(
          `SELECT user.id, user.name, user.email, user.status, user_status.status as status_name, user.date_created, user.date_updated FROM user LEFT JOIN user_status ON user.status = user_status.id
      WHERE user.id = ?`,
          userId,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT user.id, user.name, user.email, user.status, user_status.status as status_name, user.date_created, user.date_updated FROM user LEFT JOIN user_status ON user.status = user_status.id
      WHERE user.name LIKE '%${name}' AND user.status LIKE '%${status}' ORDER BY name ASC`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  updateUser: (data, userId) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE user SET ? WHERE id = ?", [data, userId]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM user WHERE id = ?", userId);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
