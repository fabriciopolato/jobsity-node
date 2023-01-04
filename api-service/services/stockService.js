const stockApi = require('../config/stockApi');
const StockQuote = require('../models/StockQuote');

const stockService = {
  getStock: ({ stockCode }) => stockApi.getStock(stockCode),
  getHistory: async ({ userId }) => {
    const history = await StockQuote.find({ userId }).sort({ createdAt: -1 }).select('-volume -userId -_id -__v -createdAt -updatedAt');

    return history;
  },
};

module.exports = stockService;
