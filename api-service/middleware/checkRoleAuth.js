const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports = function checkRoleAuth(role) {
  return function (req, res, next) {
    const userRole = req.user.role;

    if (userRole !== role) {
      throw new ForbiddenError('You are not allowed to access this resource');
    }

    next();
  };
};
