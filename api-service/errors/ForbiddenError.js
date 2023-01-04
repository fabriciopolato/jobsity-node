const { HttpError } = require('./HttpError');

exports.ForbiddenError = class ForbiddenError extends HttpError {
  constructor(message) {
    super(message, 403);
  }
};
