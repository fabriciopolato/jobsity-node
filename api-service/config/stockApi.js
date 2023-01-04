const axios = require('axios').default;

module.exports = {
  getStock: async (stockCode) => {
    const res = await axios.get(`${process.env.STOCK_URL}/stocks?stockCode=${stockCode}`);
    return res.data;
  },
};
