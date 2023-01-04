const { BadRequestError } = require('../errors/BadRequestError');
const stockService = require('../services/stockService');

const stockController = {
  getStock: async (req, res, next) => {
    const { stockCode } = req.query;
    try {
      if (!stockCode) {
        throw new BadRequestError('Missing query param');
      }

      const result = await stockService.getStock({ stockCode });

      if (result === null) {
        throw new BadRequestError('Stock quote not found! Try a new stock code');
      }

      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = stockController;
