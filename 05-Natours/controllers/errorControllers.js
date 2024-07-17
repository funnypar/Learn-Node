const resDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const resProduct = (err, res) => {
  if (err.isOperational) {
    // Operational, trusted error
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) Log error
    console.log('Error 💥', err);
    // Programming or other unknown error: Do NOT leak error
    res.status(500).json({
      status: err.status,
      message: 'Something went wrong...',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    resDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    resProduct(err, res);
  }
};
