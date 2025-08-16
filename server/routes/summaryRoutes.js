const express = require('express');
const upload = require('../middleware/upload');
const { summarizeTranscript } = require('../controllers/summaryController');

const router = express.Router();

// Upload and summarize transcript
router.post('/summarize', upload.single('transcript'), summarizeTranscript);

module.exports = router;
