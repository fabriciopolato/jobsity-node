exports.ResourceNotFoundError = class ResourceNotFoundError extends Error {
  constructor(resource) {
    super(`"${resource}" not found!`);
  }
};
