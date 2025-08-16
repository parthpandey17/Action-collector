import React from 'react';

const SummaryDisplay = ({ 
  summary, 
  editedSummary, 
  onSummaryChange, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="card">
        <div className="loading">Generating Summary...</div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="card summary-section">
      <h2>Generated Summary</h2>
      <div className="form-group">
        <label htmlFor="summary-edit">Edit Summary (if needed)</label>
        <textarea
          id="summary-edit"
          value={editedSummary}
          onChange={onSummaryChange}
          rows="10"
        />
      </div>
    </div>
  );
};

export default SummaryDisplay;
