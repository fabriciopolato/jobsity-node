const { HttpError } = require('./HttpError');

exports.UnauthorizedError = class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message, 401);
  }
};
