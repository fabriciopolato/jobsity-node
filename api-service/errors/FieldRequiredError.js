exports.FieldRequiredError = class FieldRequiredError extends Error {
  constructor(field) {
    super(`"${field}" is required`);
  }
};
