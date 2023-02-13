const BaseError = require('../utils/exceptions/BaseError');

const errorHandler = (err, req, res, next) => {
  console.log('\n', err, '\n');

  const error = {
    status: 500,
    message: 'Internal Server Error',
    description: 'Oops, something went wrong. Please try again later.',
  };

  if (err instanceof BaseError) {
    error.status = err.httpCode;
    error.message = err.message;
    error.description = err.description;

    error.errorCode = err.errorCode;
    error.errorData = err.errorData;

    if (process.env.ENVIRONMENT !== 'production') error.stackTrace = err.stack;
  }

  res.status(error.status).send(error);
};

const errorHandlerWrapper = (fn) => {
  if (fn.constructor.name === 'AsyncFunction')
    return (req, res, next) => fn(req, res).catch(next);

  return fn;
};

module.exports = { errorHandler, errorHandlerWrapper };
