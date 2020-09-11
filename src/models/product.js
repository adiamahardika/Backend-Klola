const connection = require("../configs/mysql");
const readQuery = `SELECT product.id, product.name, product.description, product.category, product.image, product.price, product.quantity, category.name as category_name, product.date_created, product.date_updated FROM product LEFT JOIN category ON product.category = category.id ORDER BY name ASC`;
module.exports = {
  checkId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE id = ?`,
        id,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  countData: (id, search_name, search_category, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      if (id !== null) {
        connection.query(
          "SELECT count(*) as total_data FROM product WHERE product.id = ?",
          id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      } else {
        connection.query(
          `SELECT count(*) as total_data FROM product WHERE product.name LIKE '%${search_name}%' AND product.category LIKE '%${search_category}%' ORDER BY ${sort_by} ${order_by}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      }
    });
  },
  getAllProduct: (
    id,
    search_name,
    search_category,
    sort_by,
    order_by,
    start_index,
    limit
  ) => {
    return new Promise((resolve, reject) => {
      if (id !== null) {
        connection.query(
          `SELECT product.id, product.name, product.description, product.category, product.image, product.price, product.quantity, category.name as category_name, product.date_created, product.date_updated FROM product LEFT JOIN category ON product.category = category.id
        WHERE product.id = ?`,
          id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT product.id, product.name, product.description, product.category, product.image, product.price, product.quantity, category.name as category_name, product.date_created, product.date_updated FROM product LEFT JOIN category ON product.category = category.id
        WHERE product.name LIKE '%${search_name}%' AND product.category LIKE '%${search_category}%'
        ORDER BY ${sort_by} ${order_by}
        LIMIT ${start_index},${limit}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  insertProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product WHERE name = ?",
        data.name,
        (error, result) => {
          if (result.length > 0) {
            connection.query(
              "UPDATE product SET quantity = ? WHERE id = ?",
              [result[0].quantity + parseInt(data.quantity), result[0].id],
              (error, result) => {
                if (error) reject(new Error(error));
                resolve(result);
              }
            );
          } else {
            connection.query("INSERT INTO product SET ?", data);
            connection.query(readQuery, (error, result) => {
              if (error) reject(new Error(error));
              resolve(result);
            });
          }
          if (error) reject(new Error(error));
        }
      );
    });
  },
  updateProduct: (data, productId) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE product SET ? WHERE id = ?", [data, productId]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM product WHERE id = ?", productId);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
