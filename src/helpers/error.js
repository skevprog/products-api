class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const sendError = (err, res) => {
  const { message, statusCode } = err;
  res.status(statusCode).send({
    status: 'error',
    statusCode,
    message,
  });
};

// handle mongoose error
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  const statusCode = 400;
  return new ErrorHandler(statusCode, message);
};

const handleError = (err, res) => {
  if (err.name === 'CastError') {
    const dbError = handleCastErrorDB(err);
    return sendError(dbError, res);
  }
  sendError(err, res);
};

module.exports = {
  ErrorHandler,
  handleError,
};
