const authService = require('../services/authService');
const emailService = require('../services/emailService');

const { AuthenticationError } = require('../errors/AuthenticationError');
const { BadRequestError } = require('../errors/BadRequestError');
const { FieldNotUniqueError } = require('../errors/FieldNotUniqueError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { InvalidValueError } = require('../errors/InvalidValueError');
const { EmailError } = require('../errors/EmailError');

const authController = {
  registerUser: async (req, res, next) => {
    const { email, role } = req.body;

    if (!email) {
      throw new BadRequestError('Missing email in req.body');
    }

    try {
      const { user, token, createdPassword } = await authService.registerUser({ email, role });

      const options = {
        to: `<${user.email}>`,
        subject: 'Welcome! These are your credentials',
        text: `User: ${user.email}\n Password: ${createdPassword}`,
        html: `<p>Hi!</p><p>Here are your new credentials:</p><p>User: ${user.email}<br/><br/>Password: ${createdPassword}<p/>`,
      };

      await emailService.send({ options });

      return res.json({ token });
    } catch (error) {
      if (error instanceof InvalidValueError) {
        next(new BadRequestError(error.message));
      }

      if (error instanceof FieldNotUniqueError) {
        next(new BadRequestError(error.message));
      }

      if (error instanceof EmailError) {
        next(new BadRequestError(error.message));
      }

      return next(error);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Missing params in req.body');
    }

    try {
      const token = await authService.login({ email, password });
      return res.json({ token });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next(new BadRequestError(error.message));
      }

      if (error instanceof AuthenticationError) {
        next(new UnauthorizedError('Invalid credentials'));
      }

      return next(error);
    }
  },
  reset: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Missing email in req.body');
    }

    try {
      const token = await authService.reset({ email, password });

      const options = {
        to: `<${email}>`,
        subject: 'Password reseted',
        text: `User: ${email}\n Password: ${password}`,
        html: `<p>Hi!</p><p>Here are your new credentials:</p><p>User: ${email}<br/><br/>Password: ${password}<p/>`,
      };

      await emailService.send({ options });

      return res.json({ token });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next(new BadRequestError(error.message));
      }

      if (error instanceof AuthenticationError) {
        next(new UnauthorizedError('Invalid credentials'));
      }

      if (error instanceof EmailError) {
        next(new BadRequestError(error.message));
      }

      return next(error);
    }
  },
};

module.exports = authController;
