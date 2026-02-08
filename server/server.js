require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Query = require('./models/Query');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/detect', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
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
        res.json({
            success: true,
            data: {
                label,
                probability,
                reason
            }
        });

    } catch (error) {
        console.error('Detection error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to process request. Is ML service running?'
        });
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 }).limit(10);
        res.json(queries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
