class BaseError extends Error {
  constructor(error) {
    const {
      message,
      description,
      httpCode = '',
      errorCode = '',
      errorData = {},
    } = error;

    super(message);

    this.description = description ?? message;

    this.httpCode = httpCode;

    this.errorCode = errorCode;
    this.errorData = errorData;
  }
}

module.exports = BaseError;
