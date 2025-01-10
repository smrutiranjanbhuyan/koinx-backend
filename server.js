require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cryptoRoutes = require('./routes/cryptoRoutes');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Middleware
app.use(express.json());
app.use('/api', cryptoRoutes);

// Cron Job to fetch cryptocurrency data every 2 hours
cron.schedule('0 */2 * * *', require('./utils/fetchCryptoData'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
