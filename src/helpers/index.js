const crypto = require("crypto");

module.exports = {
  response: (response, status, data) => {
    const result = {};

    result.status = status || 200;
    result.result = data;
    return response.status(result.status).json(result);
  },
  CustomResponsePagination: (response, status, data, pagination) => {
    const page = [];
    const result = {};

    for (var pages = 1; pages <= pagination.totalPages; pages++) {
      page[pages - 1] = pages;
    }
    result.status = status || 200;
    result.result = data;
    result.totalPages = page;

    return response.status(result.status).json(result);
  },
  customErrorResponse: (response, status, message) => {
    const result = {};

    result.status = status || 400;
    result.message = message;

    return response.status(result.status).json(result);
  },
  generateSalt: (length) => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  },
  setPassword: (password, salt) => {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    const value = hash.digest("hex");
    return {
      salt: salt,
      passwordHash: value,
    };
  },
};
