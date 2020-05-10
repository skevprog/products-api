const multer = require('multer');
const { ErrorHandler } = require('./error');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname); // Appending extension
  },
});

const filesTypeAllowed = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (!filesTypeAllowed.includes(file.mimetype)) {
    cb(new ErrorHandler(400, 'Only png or jpg files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // 1mb
  },
  fileFilter,
});

module.exports = upload;
