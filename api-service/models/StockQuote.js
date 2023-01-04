const mongoose = require('mongoose');

const { Schema } = mongoose;

const StockQuoteSchema = new Schema(
  {
    symbol: String,
    date: Date,
    open: String,
    high: String,
    low: String,
    close: String,
    volume: String,
    name: String,
    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

module.exports = mongoose.model('StockQuote', StockQuoteSchema);
