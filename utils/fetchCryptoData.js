const axios = require('axios');
const Crypto = require('../models/Crypto');
const { COINGECKO_API_URL } = process.env;

async function fetchCryptoData() {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  for (const coin of coins) {
    try {
      const { data } = await axios.get(`${COINGECKO_API_URL}?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
      const coinData = data[coin];

      await Crypto.create({
        coin,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change
      });
    } catch (err) {
      console.error(`Error fetching data for ${coin}:`, err);
    }
  }
}

module.exports = fetchCryptoData;
