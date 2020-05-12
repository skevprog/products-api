const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/products-api';

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
};

const dbConnection = async () => {
  try {
    await mongoose.connect(connectionURL, connectionOptions);
    console.log('Mongodb connection stablished');
  } catch (error) {
    console.log(`Something went wrong with mongodb connection ${error}`);
  }
};

module.exports = dbConnection;
