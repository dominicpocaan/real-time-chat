const HTTPStatusCode = require('../enums/HTTPStatusCode');
const BaseError = require('./BaseError');

class BadRequest extends BaseError {
  constructor(error) {
    const { description, errorCode = '', errorData = {} } = error;

    super({
      message: 'Bad Request',
      description,
      httpCode: HTTPStatusCode.BAD_REQUEST,
      errorCode,
      errorData,
    });
  }
}

module.exports = BadRequest;
