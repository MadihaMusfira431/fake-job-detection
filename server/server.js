require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Fake Job Detection API is running 🚀',
        status: 'Operational',
        version: '1.0.0'
    });
});

app.use('/api', require('./routes/detectionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend from local public folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// ✅ SAFE fallback (NO wildcard)
app.use((req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
