const fs = require('fs');
const { generateSummary } = require('../config/ai');
const { extractTextFromFile } = require('../utils/fileParser');

const summarizeTranscript = async (req, res) => {
  try {
    const { customPrompt } = req.body;
    let transcriptText = '';

    if (req.file) {
      // Extract text from uploaded file (supports .txt and .pdf)
      transcriptText = await extractTextFromFile(req.file.path, req.file.mimetype);
    } else if (req.body.transcriptText) {
      transcriptText = req.body.transcriptText;
    } else {
      return res.status(400).json({ error: 'No transcript provided' });
    }

    const summary = await generateSummary(transcriptText, customPrompt);

    // Keep uploaded files in uploads folder
    // if (req.file) {
    //   fs.unlinkSync(req.file.path);
    // }

    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing transcript:', error);
    
    // Handle specific errors
    if (error.message.includes('PDF parsing not available')) {
      return res.status(500).json({ 
        error: 'PDF parsing not available. Please install pdf-parse or upload a .txt file instead.' 
      });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: 'File too large. Maximum file size is 50MB.' 
      });
    }
    
    res.status(500).json({ error: 'Failed to summarize transcript' });
  }
};

module.exports = {
  summarizeTranscript
};
