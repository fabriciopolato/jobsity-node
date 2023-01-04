const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { AuthenticationError } = require('../errors/AuthenticationError');
const { FieldNotUniqueError } = require('../errors/FieldNotUniqueError');
const { InvalidValueError } = require('../errors/InvalidValueError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');

const User = require('../models/User');

const authService = {
  registerUser: async ({ email, role }) => {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new FieldNotUniqueError('email');
    }

    if (role && role !== 'admin' && role !== 'user') {
      throw new InvalidValueError('role');
    }

    const user = new User({ email, role });

    const createdPassword = user.password;

    await user.save();
    delete user.password;

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET); // eslint-disable-line

    return { user, token, createdPassword };
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ResourceNotFoundError('user');
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new AuthenticationError("email and password don't match");
    }

    delete user.password;

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET); // eslint-disable-line

    return token;
  },
  reset: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ResourceNotFoundError('user');
    }

    user.password = password;
    await user.save();

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET); // eslint-disable-line

    return token;
  },
};

module.exports = authService;
