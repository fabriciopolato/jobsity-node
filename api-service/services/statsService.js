const StockQuote = require('../models/StockQuote');

const statsService = {
  getStats: async () => {
    const result = await StockQuote.aggregate([
      {
        $group: {
          _id: '$symbol',
          times_requested: { $sum: 1 },
        },
      },
      {
        $sort: { times_requested: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          stock: { $toLower: '$_id' },
          times_requested: 1,
        },
      },
    ]);

    return result;
  },
};

module.exports = statsService;
