const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, './pictures')
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (request, file, cb) => {
  const imageFilter = file.mimetype.toLowerCase()
  if (imageFilter === 'image/png' || imageFilter === 'image/jpeg' || imageFilter === 'image/jpg') {
    return cb(null, true)
  } else {
    return cb(null, false, new Error('Only images allowed!'))
  }
}

const upload = multer({
  storage,
  limits: { size: 1024 * 1024 },
  fileFilter
})

const uploadPictures = upload.single('image')

module.exports = {
  uploadFiles: uploadPictures
}
