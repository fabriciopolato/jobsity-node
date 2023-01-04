const axios = require('axios').default;
const csvParser = require('../utils/csvParser');

const stockService = {
  getStock: async ({ stockCode }) => {
    const { data } = await axios.get(`${process.env.STOOQ_URL}?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`);

    const result = csvParser(data)[0];

    if (result.high === 'N/D') return null;

    return result;
  },
};

module.exports = stockService;
