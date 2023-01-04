const { EmailError } = require('../errors/EmailError');
const sendEmail = require('../config/nodemailer');
const emailService = require('./emailService');

jest.mock('../config/nodemailer', () => jest.fn());

const properties = { /* no properties */};

describe('emailService.send', () => {
  it('throws an EmailError when it fails to send the email', async () => {
    sendEmail.mockImplementationOnce(() => Promise.reject(new Error()));

    const actual = emailService.send(properties);

    await expect(actual).rejects.toThrow(EmailError);
  });
});
