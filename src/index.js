const express = require('express');

const app = express();
const dbConnection = require('./db/mongoose');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(require('./routes/products'));
app.use(require('./routes/reviews'));

dbConnection();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
