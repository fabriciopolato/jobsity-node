const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('mongoDB is connected');
  },
};
