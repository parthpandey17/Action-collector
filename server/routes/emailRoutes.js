const express = require('express');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

// Send email with summary
router.post('/send-email', sendEmail);

module.exports = router;
