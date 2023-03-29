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
    volume_24h: Number,
  });
  
  const Exchange = mongoose.model('exchangeTable', exchangeSchema);
  

// Fetch Exchange data from API and store in MongoDB
app.get('/fetch-exchanges', async (req, res) => {
  const response = await axios.get('https://rest.coinapi.io/v1/exchanges', {
    headers: { 'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9' },
  });
  console.log(response);


  const exchanges = response.data;
  const exchangeIds = exchanges.map((exchange) => exchange.exchange_id);

  await Exchange.deleteMany({ exchange_id: { $nin: exchangeIds } });

  for (const exchange of exchanges) {
    const existingExchange = await Exchange.findOne({
      exchange_id: exchange.exchange_id,
    });

    if (existingExchange) {
      existingExchange.name = exchange.name;
      existingExchange.website = exchange.website;
      existingExchange.volume_24h = exchange.volume_24h;
      await existingExchange.save();
    } else {
      await Exchange.create(exchange);
    }
  }

  res.json({ success: true });
});

// Fetch Exchange icon and store in MongoDB
app.get('/fetch-exchange-icon/:exchangeId', async (req, res) => {
  const { exchangeId } = req.params;

  const response = await axios.get(
    `https://rest.coinapi.io/v1/exchanges/icons/32/${exchangeId}.png`,
    { responseType: 'arraybuffer' }
  );
  // console.log(response);

  const iconBuffer = Buffer.from(response.data, 'binary');

  await Exchange.updateOne(
    { exchange_id: exchangeId },
    { icon: iconBuffer }
  );

  res.end(iconBuffer, 'binary');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
