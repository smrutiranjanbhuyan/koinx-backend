const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();


router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin' });
  }

  const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestRecord) {
    return res.status(404).json({ error: 'Data not found' });
  }

  res.json({
    price: latestRecord.price,
    marketCap: latestRecord.marketCap,
    "24hChange": latestRecord.change24h
  });
});



router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin' });
  }

  const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (records.length < 2) {
    return res.status(400).json({ error: 'Not enough data' });
  }

  const prices = records.map(record => record.price);
  const deviation = calculateDeviation(prices);

  res.json({ deviation });
});

function calculateDeviation(prices) {
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
}

module.exports = router;
