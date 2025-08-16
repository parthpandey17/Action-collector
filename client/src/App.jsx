import React, { useState } from 'react';

// Components
import TranscriptUpload from './components/TranscriptUpload';
import SummaryDisplay from './components/SummaryDisplay';
import EmailSection from './components/EmailSection';

// Hooks
import useTranscript from './hooks/useTranscript';
import useEmail from './hooks/useEmail';

// Services
import { generateSummary, sendEmailSummary } from './services/api';

// Utils
import { validateTranscript, validateEmailRecipients, validateSummary } from './utils/validation';

function App() {
  const [summary, setSummary] = useState('');
  const [editedSummary, setEditedSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Custom hooks
  const {
    transcriptFile,
    transcriptText,
    customPrompt,
    handleFileChange,
    handleTextChange,
    handlePromptChange
  } = useTranscript();

  const {
    recipients,
    emailSubject,
    sendingEmail,
    setEmailSubject,
    setSendingEmail,
    addRecipient,
    updateRecipient,
    removeRecipient
  } = useEmail();

  const handleGenerateSummary = async () => {
    const validationError = validateTranscript(transcriptFile, transcriptText);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const result = await generateSummary(transcriptFile, transcriptText, customPrompt);
      setSummary(result.summary);
      setEditedSummary(result.summary);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    const recipientError = validateEmailRecipients(recipients);
    if (recipientError) {
      setError(recipientError);
      return;
    }

    const summaryError = validateSummary(editedSummary);
    if (summaryError) {
      setError(summaryError);
      return;
    }

    setSendingEmail(true);
    setError('');
    setSuccess('');

    try {
      const validRecipients = recipients.filter(email => email.trim() && email.includes('@'));
      await sendEmailSummary(validRecipients, emailSubject, editedSummary);
      setSuccess('Email sent successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI-Powered Meeting Notes Summarizer</h1>
        <p>Upload your meeting transcript and get an AI-generated summary</p>
      </div>

      <TranscriptUpload
        transcriptFile={transcriptFile}
        transcriptText={transcriptText}
        customPrompt={customPrompt}
        onFileChange={handleFileChange}
        onTextChange={handleTextChange}
        onPromptChange={handlePromptChange}
        error={error}
      />

      <button
        className="btn"
        onClick={handleGenerateSummary}
        disabled={loading}
      >
        {loading ? 'Generating Summary...' : 'Generate Summary'}
      </button>

      <SummaryDisplay
        summary={summary}
        editedSummary={editedSummary}
        onSummaryChange={(e) => setEditedSummary(e.target.value)}
        loading={loading}
      />

      {summary && (
        <div className="card">
          <EmailSection
            emailSubject={emailSubject}
            recipients={recipients}
            success={success}
            error={error}
            sendingEmail={sendingEmail}
            onSubjectChange={(e) => setEmailSubject(e.target.value)}
            onAddRecipient={addRecipient}
            onUpdateRecipient={updateRecipient}
            onRemoveRecipient={removeRecipient}
            onSendEmail={handleSendEmail}
          />
        </div>
      )}
    </div>
  );
}

export default App;
