const express = require('express');

const app = express();
const dbConnection = require('./db/mongoose');
const { handleError, ErrorHandler } = require('./helpers/error');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(require('./routes/products'));
app.use(require('./routes/reviews'));

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
