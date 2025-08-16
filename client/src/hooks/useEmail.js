import { useState } from 'react';

const useEmail = () => {
  const [recipients, setRecipients] = useState(['']);
  const [emailSubject, setEmailSubject] = useState('Meeting Summary');
  const [sendingEmail, setSendingEmail] = useState(false);

  const addRecipient = () => {
    setRecipients([...recipients, '']);
  };

  const updateRecipient = (index, value) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
  };

  const removeRecipient = (index) => {
    if (recipients.length > 1) {
      const newRecipients = recipients.filter((_, i) => i !== index);
      setRecipients(newRecipients);
    }
  };

  const resetEmail = () => {
    setRecipients(['']);
    setEmailSubject('Meeting Summary');
    setSendingEmail(false);
  };

  return {
    recipients,
    emailSubject,
    sendingEmail,
    setEmailSubject,
    setSendingEmail,
    addRecipient,
    updateRecipient,
    removeRecipient,
    resetEmail
  };
};

export default useEmail;
