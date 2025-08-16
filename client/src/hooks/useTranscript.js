import { useState } from 'react';

const useTranscript = () => {
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [transcriptText, setTranscriptText] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTranscriptFile(file);
    setTranscriptText(''); // Clear text input when file is selected
  };

  const handleTextChange = (e) => {
    setTranscriptText(e.target.value);
  };

  const handlePromptChange = (e) => {
    setCustomPrompt(e.target.value);
  };

  const resetTranscript = () => {
    setTranscriptFile(null);
    setTranscriptText('');
    setCustomPrompt('');
  };

  return {
    transcriptFile,
    transcriptText,
    customPrompt,
    handleFileChange,
    handleTextChange,
    handlePromptChange,
    resetTranscript
  };
};

export default useTranscript;
