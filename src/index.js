const express = require('express');

const app = express();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const dbConnection = require('./db/mongoose');
const { productsRouter, reviewsRouter } = require('./routes');
const { handleError, ErrorHandler } = require('./middlewares/error');

const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(productsRouter);
app.use(reviewsRouter);

const uploadFile = upload.single('productImage');
app.post('/img', (req, res, next) => {
  uploadFile(req, res, function(err) {
    if (err) {
      next(new ErrorHandler(400, err.message));
    }
    console.log(req.file);
  });
});

app.get('*', (req, res, next) => {
  next(new ErrorHandler(404, 'Route not found'));
});

// Error middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

dbConnection();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
