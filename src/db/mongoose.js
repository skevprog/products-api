const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/products-api';

const dbConnection = async () => {
  try {
    await mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log('Mongodb connection stablished');
  } catch (error) {
    console.log(`Something went wrong with mongodb connection ${error}`);
  }
};

module.exports = dbConnection;
