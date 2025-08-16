# AI-Powered Meeting Notes Summarizer & Sharer

A full-stack application that uses AI to summarize meeting transcripts and share them via email.

## 🚀 Features

- **AI-Powered Summarization**: Uses Groq's free Llama3 model for intelligent transcript summarization
- **File Upload**: Support for .txt transcript files or direct text input
- **Custom Prompts**: Customize summarization instructions (e.g., "bullet points for executives")
- **Editable Summaries**: Edit AI-generated summaries before sharing
- **Email Integration**: Send summaries via Gmail with professional HTML formatting
- **File Persistence**: Uploaded files are saved in the uploads folder

## 📁 Project Structure

- **CSS3** for styling (no external UI libraries for simplicity)

### Backend
- **Node.js** with Express.js
- **Multer** for file upload handling
- **OpenAI API** for text summarization
- **Nodemailer** for email functionality
- **CORS** for cross-origin requests

### Deployment
- **Frontend**: Netlify (static hosting)
- **Backend**: Railway/Render (server hosting)

## Project Structure

```
Action-Collector/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── TranscriptUpload.jsx
│   │   │   ├── SummaryDisplay.jsx
│   │   │   └── EmailSection.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useTranscript.js
│   │   │   └── useEmail.js
│   │   ├── services/           # API service functions
│   │   │   └── api.js
│   │   ├── utils/              # Utility functions
│   │   │   └── validation.js
│   │   ├── App.jsx             # Main app component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # App entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Node.js backend
│   ├── config/                 # Configuration files
│   │   ├── ai.js              # Groq AI configuration
│   │   ├── email.js           # Gmail SMTP configuration
│   │   └── database.js        # Database config (future)
│   ├── controllers/            # Business logic
│   │   ├── summaryController.js
│   │   └── emailController.js
│   ├── routes/                 # API routes
│   │   ├── summaryRoutes.js
│   │   └── emailRoutes.js
│   ├── middleware/             # Custom middleware
│   │   └── upload.js          # File upload handling
│   ├── utils/                  # Utility functions
│   │   └── fileParser.js      # PDF/TXT file parsing
│   ├── uploads/               # Uploaded files storage
│   ├── app.js                 # Main server file
│   ├── index.js               # Legacy entry point
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   └── package.json
│
├── .gitignore
├── package.json               # Root package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- Gmail account for email functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meeting-notes-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `.env` file with your credentials:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```

4. **Gmail Setup for Email Functionality**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Google Account → Security → App passwords
   - Use the generated app password in the `EMAIL_PASS` field

### Running the Application

**Development Mode:**
```bash
npm run dev
```
This starts both frontend (http://localhost:5173) and backend (http://localhost:5000) concurrently.

**Production Build:**
```bash
npm run build
npm start
```

## API Endpoints

### POST /api/summarize
Generates AI summary from transcript text or uploaded file.

**Request:**
- `transcript` (file): Text file upload
- `transcriptText` (string): Direct text input
- `customPrompt` (string): Optional custom instructions

**Response:**
```json
{
  "summary": "Generated AI summary text..."
}
```

### POST /api/send-email
Sends summary via email to specified recipients.

**Request:**
```json
{
  "recipients": ["email1@example.com", "email2@example.com"],
  "subject": "Meeting Summary",
  "summary": "Summary content to send..."
}
```

**Response:**
```json
{
  "message": "Email sent successfully"
}
```

## Usage Guide

1. **Upload Transcript**: Choose a .txt file or paste text directly
2. **Add Custom Prompt** (Optional): Specify how you want the summary formatted
3. **Generate Summary**: Click "Generate Summary" to get AI-powered results
4. **Edit Summary**: Modify the generated summary as needed
5. **Share via Email**: Add recipient emails and send the summary

## Deployment

### Frontend (Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables if needed

### Backend (Railway/Render)
1. Push code to GitHub repository
2. Connect Railway/Render to your repository
3. Set environment variables in the platform dashboard
4. Deploy the server

## Error Handling

The application includes comprehensive error handling for:
- Invalid file uploads
- Missing API keys
- Network failures
- Email delivery issues
- Invalid email addresses

## Security Considerations

- API keys are stored in environment variables
- File uploads are validated and cleaned up after processing
- Email addresses are validated before sending
- CORS is configured for cross-origin requests

## Future Enhancements

- Support for multiple file formats (PDF, DOCX)
- User authentication and session management
- Summary templates and presets
- Integration with calendar applications
- Real-time collaboration features

## License

MIT License - feel free to use and modify as needed.
