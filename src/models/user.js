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
  getAllUser: (id, name, status, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      if (id !== null) {
        connection.query(
          `SELECT user.id, user.name, user.email, user.status, user_status.status as status_name, user.date_created, user.date_updated FROM user LEFT JOIN user_status ON user.status = user_status.id
      WHERE user.id = ?`,
          id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT user.id, user.name, user.email, user.status, user_status.status as status_name, user.date_created, user.date_updated FROM user LEFT JOIN user_status ON user.status = user_status.id
      WHERE user.name LIKE '%${name}%' AND user.status LIKE '%${status}%' ORDER BY ${sort_by} ${order_by}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE user SET ? WHERE id = ?", [data, id]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM user WHERE id = ?", id);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
