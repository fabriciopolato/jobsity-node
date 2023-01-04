const sendEmail = require('../config/nodemailer');
const { EmailError } = require('../errors/EmailError');

const emailService = {
  send: async ({ options }) => {
    try {
      const response = await sendEmail(options);
      return response;
    } catch (error) {
      throw new EmailError(error.message);
    }
  },
};

module.exports = emailService;
