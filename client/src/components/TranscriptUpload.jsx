import React from 'react';

const TranscriptUpload = ({ 
  transcriptFile, 
  transcriptText, 
  customPrompt,
  onFileChange, 
  onTextChange, 
  onPromptChange,
  error 
}) => {
  return (
    <div className="card">
      <h2>Upload Transcript</h2>
      
      <div className="form-group">
        <label htmlFor="file-upload">Upload Transcript File (.txt, .pdf)</label>
        <input
          id="file-upload"
          type="file"
          accept=".txt,.pdf"
          onChange={onFileChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="transcript-text">Or Paste Transcript Text</label>
        <textarea
          id="transcript-text"
          value={transcriptText}
          onChange={onTextChange}
          placeholder="Paste your meeting transcript here..."
          disabled={!!transcriptFile}
        />
      </div>

      <div className="form-group">
        <label htmlFor="custom-prompt">Custom Instructions (Optional)</label>
        <textarea
          id="custom-prompt"
          value={customPrompt}
          onChange={onPromptChange}
          placeholder="e.g., 'Summarize in bullet points for executives' or 'Highlight only action items'"
        />
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TranscriptUpload;
