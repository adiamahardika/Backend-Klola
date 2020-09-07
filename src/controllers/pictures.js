const multer = require("multer");
const crypto = require("crypto");

const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, "./pictures");
    },
    filename: function (request, file, callback) {
      let customFileName = Date.now() + crypto.randomBytes(6).toString("hex"),
        fileExtension = file.originalname.split(".")[
          file.originalname.split(".").length - 1
        ];
      callback(null, customFileName + "." + fileExtension);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (request, file, callback) => {
    const imageFilter = file.mimetype.toLowerCase();
    if (
      imageFilter === "image/png" ||
      imageFilter === "image/jpeg" ||
      imageFilter === "image/jpg"
    ) {
      return callback(null, true);
    } else {
      return callback(
        null,
        false,
        new Error(
          "Just image with extension .png, .jpg, and .jpeg can be upload!"
        )
      );
    }
  },
}).single("image");

module.exports = uploadFiles;
