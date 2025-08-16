const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import configurations
const { initializeEmailTransporter } = require('./config/email');

// Import routes
const summaryRoutes = require('./routes/summaryRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize email transporter
initializeEmailTransporter();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Meeting Notes Summarizer API' });
});

// API Routes
app.use('/api', summaryRoutes);
app.use('/api', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
