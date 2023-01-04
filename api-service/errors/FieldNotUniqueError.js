exports.FieldNotUniqueError = class FieldNotUniqueError extends Error {
  constructor(resource) {
    super(`"${resource}" already exists. It must be unique`);
  }
};
