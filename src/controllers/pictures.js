const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, './pictures')
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname)
  }
})

const uploadFiles = multer({
  storage,
  // limits: (fileSize, callback) => {
  //   if (fileSize > 1024 * 1024) {
  //     return callback(null, false, new Error('File image is too large!'))
  //   }
  // },
  // fileFilter: (request, file, callback) => {
  //   const imageFilter = file.mimetype.toLowerCase()
  //   if (imageFilter === 'image/png' || imageFilter === 'image/jpeg' || imageFilter === 'image/jpg') {
  //     return callback(null, true)
  //   } else {
  //     return callback(null, false, new Error('Just image with extension .png, .jpg, and .jpeg can be upload!'))
  //   }
  // }
}).single('image')

module.exports = uploadFiles
