const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Rate limit classify endpoint
app.use('/api/classify', rateLimit({ windowMs: 60 * 1000, max: 10 }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/classify', require('./routes/classify'));
app.use('/api/stats', require('./routes/stats'));

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });