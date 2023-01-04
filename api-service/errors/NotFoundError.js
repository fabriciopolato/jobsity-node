const { HttpError } = require('./HttpError');

exports.NotFoundError = class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
};
