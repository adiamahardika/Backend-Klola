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
  countData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT count(*) as totalData FROM product",
        (error, result) => {
          resolve(result[0].totalData);
        }
      );
    });
  },
  getAllProduct: (
    limit,
    page,
    searchName,
    sortBy,
    orderBy,
    productId,
    searchCategory
  ) => {
    const firstData = limit * page - limit;
    return new Promise((resolve, reject) => {
      if (productId !== null) {
        connection.query(
          `SELECT product.id, product.name, product.description, product.category, product.image, product.price, product.quantity, category.name as category_name, product.date_created, product.date_updated FROM product LEFT JOIN category ON product.category = category.id
        WHERE product.id = ?`,
          productId,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT product.id, product.name, product.description, product.category, product.image, product.price, product.quantity, category.name as category_name, product.date_created, product.date_updated FROM product LEFT JOIN category ON product.category = category.id
        WHERE product.name LIKE '%${searchName}%' AND category.id LIKE '%${searchCategory}%'
        ORDER BY ${sortBy} ${orderBy}
        LIMIT ${firstData},${limit}`,
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
