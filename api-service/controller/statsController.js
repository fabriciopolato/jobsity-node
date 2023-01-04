const statsService = require('../services/statsService');

const statsController = {
  getStats: async (req, res, next) => {
    try {
      const result = await statsService.getStats();
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = statsController;
