const stockService = require('../services/stockService');

const { BadRequestError } = require('../errors/BadRequestError');

const StockQuote = require('../models/StockQuote');

const stockController = {
  getStock: async (req, res, next) => {
    const { q } = req.query;
    const userId = req.user._id;

    try {
      if (!q) {
        throw new BadRequestError('Missing query param');
      }

      const stockQuoteObj = await stockService.getStock({ stockCode: q });

      const date = new Date(`${stockQuoteObj.date} ${stockQuoteObj.time}`);

      delete stockQuoteObj.time;

      await StockQuote.create({
        ...stockQuoteObj,
        date: date.toISOString(),
        userId,
      });

      delete stockQuoteObj.volume;
      delete stockQuoteObj.date;

      return res.json(stockQuoteObj);
    } catch (error) {
      if (error.response?.status === 400) {
        return next(new BadRequestError(error.response.data));
      }
      return next(error);
    }
  },
  getHistory: async (req, res, next) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const history = await stockService.getHistory({ userId: req.user._id });
      return res.json(history);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = stockController;
