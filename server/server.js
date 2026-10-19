import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Inquiry from './models/Inquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/craftpixel';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with gentle error handling
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB Connected Successfully to craftpixel database');
  })
  .catch((err) => {
    console.warn('! MongoDB connection warning (Local MongoDB not running or URI invalid). Server will still serve API requests in mock/in-memory mode.');
  });

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CraftPixel Studios MERN API',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected/demo',
    timestamp: new Date(),
  });
});

// Create inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const inquiry = new Inquiry({ name, email, message });
      await inquiry.save();
      return res.status(201).json({ success: true, message: 'Inquiry saved to MongoDB!', data: inquiry });
    } else {
      // Mock save when local MongoDB is not active
      console.log('Received inquiry (in-memory demo):', { name, email, message });
      return res.status(201).json({ success: true, message: 'Inquiry accepted (Demo Mode)!', data: { name, email, message } });
    }
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }
    res.json({ success: true, count: 0, data: [], note: 'Connect MongoDB to view stored records' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`✓ CraftPixel Studios Express API listening on http://localhost:${PORT}`);
});
