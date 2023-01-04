exports.InvalidValueError = class InvalidValueError extends Error {
  constructor(param) {
    super(`"${param}" has a invalid value`);
  }
};
