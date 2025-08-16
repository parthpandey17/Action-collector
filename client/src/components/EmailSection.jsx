import React from 'react';

const EmailSection = ({
  emailSubject,
  recipients,
  success,
  error,
  sendingEmail,
  onSubjectChange,
  onAddRecipient,
  onUpdateRecipient,
  onRemoveRecipient,
  onSendEmail
}) => {
  return (
    <div className="email-section">
      <h3>Share via Email</h3>
      
      <div className="form-group">
        <label htmlFor="email-subject">Email Subject</label>
        <input
          id="email-subject"
          type="text"
          value={emailSubject}
          onChange={onSubjectChange}
        />
      </div>

      <div className="form-group">
        <label>Recipients</label>
        {recipients.map((recipient, index) => (
          <div key={index} className="recipients-input">
            <input
              type="email"
              value={recipient}
              onChange={(e) => onUpdateRecipient(index, e.target.value)}
              placeholder="Enter email address"
            />
            {recipients.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveRecipient(index)}
                style={{ marginLeft: '10px', padding: '5px 10px' }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn add-recipient-btn"
          onClick={onAddRecipient}
        >
          Add Recipient
        </button>
      </div>

      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      <button
        className="btn btn-secondary"
        onClick={onSendEmail}
        disabled={sendingEmail}
      >
        {sendingEmail ? 'Sending Email...' : 'Send Email'}
      </button>
    </div>
  );
};

export default EmailSection;
