const fs = require('fs');
const path = require('path');

// PDF text extraction utility
const extractTextFromPDF = async (filePath) => {
  try {
    // For now, we'll use a simple approach that works without external dependencies
    // In production, you might want to use pdf-parse or similar library
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    // Fallback: if pdf-parse is not available, return error message
    throw new Error('PDF parsing not available. Please install pdf-parse: npm install pdf-parse');
  }
};

// Extract text from uploaded file based on file type
const extractTextFromFile = async (filePath, mimetype) => {
  const fileExtension = path.extname(filePath).toLowerCase();
  
  if (mimetype === 'text/plain' || fileExtension === '.txt') {
    // Handle text files
    return fs.readFileSync(filePath, 'utf8');
  } else if (mimetype === 'application/pdf' || fileExtension === '.pdf') {
    // Handle PDF files
    return await extractTextFromPDF(filePath);
  } else {
    throw new Error('Unsupported file type. Only .txt and .pdf files are supported.');
  }
};

module.exports = {
  extractTextFromFile,
  extractTextFromPDF
};
