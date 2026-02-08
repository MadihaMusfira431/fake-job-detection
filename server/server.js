require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Query = require('./models/Query');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Fake Job Detection API is running 🚀',
        status: 'Operational',
        version: '1.0.0'
    });
});

app.post('/api/detect', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Text is required for analysis'
            });
        }

        // Call ML Service
        const mlResponse = await axios.post(process.env.ML_SERVICE_URL, { text });
        const { label, probability, reason } = mlResponse.data;

        // Save to Database
        const newQuery = new Query({
            inputText: text,
            label,
            probability,
            reason
        });
        await newQuery.save();

        // Return response to frontend
        res.status(200).json({
            success: true,
            data: {
                label,
                probability,
                reason
            }
        });

    } catch (error) {
        console.error('Detection error:', error.message);
        res.status(503).json({
            success: false,
            error: 'AI Analysis service unavailable. Please check ml-service.'
        });
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            data: queries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch history from database'
        });
    }
});

// Serve Static Frontend Files
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Catch-all route to serve React's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
