// Validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTranscript = (transcriptFile, transcriptText) => {
  if (!transcriptFile && !transcriptText.trim()) {
    return 'Please upload a transcript file or enter transcript text';
  }
  return null;
};

export const validateEmailRecipients = (recipients) => {
  const validRecipients = recipients.filter(email => email.trim() && validateEmail(email));
  
  if (validRecipients.length === 0) {
    return 'Please enter at least one valid email address';
  }
  
  return null;
};

export const validateSummary = (summary) => {
  if (!summary.trim()) {
    return 'No summary to send';
  }
  return null;
};
