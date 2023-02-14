const HTTPStatusCode = require('../enums/HTTPStatusCode');
const BaseError = require('./BaseError');

class Unauthorized extends BaseError {
  constructor(error) {
    const { description, errorCode = '', errorData = {} } = error;

    super({
      message: 'Unauthorized',
      description,
      httpCode: HTTPStatusCode.UNAUTHORIZED,
      errorCode,
      errorData,
    });
  }
}

module.exports = Unauthorized;
