const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports = function checkToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Missing authorization header or token');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid authorization header or missing token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = { _id: decoded._id, role: decoded.role }; // eslint-disable-line

    req.user = user;
    next();
  } catch {
    next(new UnauthorizedError('Invalid token'));
  }
};
