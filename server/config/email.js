const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure nodemailer with debug info
let transporter = null;

const initializeEmailTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('Email config found:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined');
    
    try {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      console.log('Transporter created successfully');
    } catch (err) {
      console.error('Failed to create transporter:', err);
    }
  } else {
    console.log('Email credentials not found in environment variables');
  }
};

const getTransporter = () => transporter;

module.exports = {
  initializeEmailTransporter,
  getTransporter
};
