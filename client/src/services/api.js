import axios from 'axios';

const API_BASE_URL = '/api';

// Summary API calls
export const generateSummary = async (transcriptFile, transcriptText, customPrompt) => {
  const formData = new FormData();
  
  if (transcriptFile) {
    formData.append('transcript', transcriptFile);
  } else {
    formData.append('transcriptText', transcriptText);
  }
  
  if (customPrompt.trim()) {
    formData.append('customPrompt', customPrompt);
  }

  const response = await axios.post(`${API_BASE_URL}/summarize`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Email API calls
export const sendEmailSummary = async (recipients, subject, summary) => {
  const response = await axios.post(`${API_BASE_URL}/send-email`, {
    recipients,
    subject,
    summary
  });

  return response.data;
};
