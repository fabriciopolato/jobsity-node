const { HttpError } = require('./HttpError');

exports.BadRequestError = class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400);
  }
};
