const bcrypt = require('bcrypt');
const { AuthenticationError } = require('../errors/AuthenticationError');
const { FieldNotUniqueError } = require('../errors/FieldNotUniqueError');
const { InvalidValueError } = require('../errors/InvalidValueError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');

const User = require('../models/User');

const authService = require('./authService');

describe('authService.registerUser', () => {
  function buildProperties(overrides) {
    return { email: 'any-email@mail.com', role: 'user', ...overrides };
  }

  it('throws an FieldNotUniqueError if an user with the given e-mail already exists', async () => {
    const properties = buildProperties();

    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(properties));

    const actual = authService.registerUser(properties);

    expect(User.findOne).toHaveBeenCalledWith({ email: properties.email });
    await expect(actual).rejects.toThrow(FieldNotUniqueError);
  });

  it('throws an InvalidValueError when an invalid role is provided', async () => {
    const properties = buildProperties({ role: 'invalid' });
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(null));

    const actual = authService.registerUser(properties);

    await expect(actual).rejects.toThrow(InvalidValueError);
  });

  it('creates an user and token when an unique e-mail is provided', async () => {
    const properties = buildProperties();
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(null));
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve());

    const { user, token, createdPassword } = await authService.registerUser(properties);

    expect(User.prototype.save).toHaveBeenCalled();
    expect(user).toHaveProperty('email', properties.email);
    expect(user).toHaveProperty('role', properties.role);
    expect(token).toBeDefined();
    expect(createdPassword).toBeDefined();
  });

  it('creates an admin and token when an unique e-mail and admin role is provided', async () => {
    const role = 'admin';
    const properties = buildProperties({ role });
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(null));
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve());

    const { user, token, createdPassword } = await authService.registerUser(properties);

    expect(User.prototype.save).toHaveBeenCalled();
    expect(user).toHaveProperty('email', properties.email);
    expect(user).toHaveProperty('role', role);
    expect(token).toBeDefined();
    expect(createdPassword).toBeDefined();
  });
});

describe('authService.login', () => {
  const email = 'any-email@mail.com';
  const password = 'any-password';

  function buildProperties(overrides) {
    return { email, password, ...overrides };
  }

  function buildUser(overrides) {
    return {
      email, password, role: 'user', ...overrides,
    };
  }

  it('throws an ResourceNotFoundError when no user is found for the given e-mail', async () => {
    const properties = buildProperties();
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(null));

    const actual = authService.login(properties);

    await expect(actual).rejects.toThrow(ResourceNotFoundError);
  });

  it('throws an AuthenticationError when password does not match', async () => {
    const properties = buildProperties({ password: 'wrong-password' });
    const user = buildUser();
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(user));
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce((password1, password2) => Promise.resolve(password1 === password2));

    const actual = authService.login(properties);

    expect(User.findOne).toHaveBeenCalledWith({ email: properties.email });
    await expect(actual).rejects.toThrow(AuthenticationError);
  });

  it('returns a token when valid email and password are provided', async () => {
    const properties = buildProperties();
    const user = buildUser();
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(user));
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce((password1, password2) => Promise.resolve(password1 === password2));

    const token = await authService.login(properties);

    expect(token).toBeDefined();
  });
});

describe('authService.reset', () => {
  const email = 'any-email@mail.com';
  const password = 'any-password';

  function buildProperties(overrides) {
    return { email, password, ...overrides };
  }

  function buildUser(overrides) {
    return {
      email,
      password,
      role: 'user',
      save() {
        return Promise.resolve();
      },
      ...overrides,
    };
  }

  it('throws an ResourceNotFoundError when no user is found for the given e-mail', async () => {
    const properties = buildProperties();
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(null));

    const actual = authService.reset(properties);

    await expect(actual).rejects.toThrow(ResourceNotFoundError);
  });

  it('returns a token when valid email and password are provided', async () => {
    const properties = buildProperties();
    const user = buildUser();
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(user));

    const token = await authService.reset(properties);

    expect(token).toBeDefined();
  });
});
