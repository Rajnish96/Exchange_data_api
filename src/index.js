const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/exchange', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


// Define Exchange schema and model
const exchangeSchema = new mongoose.Schema({
  exchange_id: String,
  name: String,
  website: String,
  data_symbols_count: Number,
});

const Exchange = mongoose.model('exchangeCollection', exchangeSchema);

// schema for icons
const exchangeSchemaIcons = new mongoose.Schema({
  exchange_id: String,
  url: String,
});

const ExchangeIcons = mongoose.model('exchangeCollectionIcons', exchangeSchemaIcons);


// Fetch Exchange data from API and store in MongoDB
app.get('/fetch-exchanges', async (req, res) => {

  const response = await axios.get('https://rest.coinapi.io/v1/exchanges', {
    headers: { 'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9' },
  });

  const exchanges = response.data;


  for (const exchange of exchanges) {
    const existingExchange = await Exchange.findOne({
      exchange_id: exchange.exchange_id,
    });

    if (existingExchange) {
      existingExchange.name = exchange.name;
      existingExchange.website = exchange.website;
      existingExchange.data_symbols_count = exchange.data_symbols_count;
      await existingExchange.save();
    } else {
      await Exchange.create(exchange);
    }
  }

  res
    .status(201)
    .send({ message: `Successfully` })
    .end()
});

// Fetch Exchange icon and store in MongoDB
app.get('/fetch-exchange-icon', async (req, res) => {
  const response = await axios.get('https://rest.coinapi.io/v1/exchanges/icons/32', {
    headers: { 'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9' },
  });

  const exchanges = response.data;


  for (const exchange of exchanges) {
    const existingExchange = await Exchange.findOne({
      exchange_id: exchange.exchange_id,
    });

    if (existingExchange) {
      existingExchange.url = exchange.url;
      await existingExchange.save();
    } else {
      await Exchange.create(exchange);
    }
  }

  res
  .status(201)
  .send({ message: `Successfully` })
  .end()

});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
