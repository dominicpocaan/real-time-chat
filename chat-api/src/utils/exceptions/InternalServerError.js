const HTTPStatusCode = require('../enums/HTTPStatusCode');
const BaseError = require('./BaseError');

class InternalServerError extends BaseError {
  constructor(error) {
    const { description, errorCode = '', errorData = {} } = error;

    super({
      message: 'Internal Server Error',
      description,
      httpCode: HTTPStatusCode.INTERNAL_SERVER,
      errorCode,
      errorData,
    });
  }
}

module.exports = InternalServerError;
