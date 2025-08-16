const Groq = require('groq-sdk');
require('dotenv').config();

// Initialize Groq AI client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generateSummary = async (transcriptText, customPrompt) => {
  const prompt = customPrompt || 
    'Summarize the following meeting transcript in a clear, structured format with key points and action items:';

  const completion = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that summarizes meeting transcripts based on user instructions.'
      },
      {
        role: 'user',
        content: `${prompt}\n\nTranscript:\n${transcriptText}`
      }
    ],
    max_tokens: 1000,
    temperature: 0.7
  });

  return completion.choices[0].message.content;
};

module.exports = {
  generateSummary
};
