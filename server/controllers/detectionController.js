const axios = require('axios');
const Query = require('../models/Query');

// @desc    Detect fake job
// @route   POST /api/detect
// @access  Public (or Private depending on requirements, for now keeping as it was)
exports.detectJob = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Text is required'
            });
        }

        const mlResponse = await axios.post(process.env.ML_SERVICE_URL, { text });
        const { label, probability, reason } = mlResponse.data;

        const newQuery = new Query({
            inputText: text,
            label,
            probability,
            reason
        });
        await newQuery.save();

        res.status(200).json({
            success: true,
            data: { label, probability, reason }
        });

    } catch (error) {
        console.error(error.message);
        res.status(503).json({
            success: false,
            error: 'ML service unavailable'
        });
    }
};

// @desc    Get detection history
// @route   GET /api/history
// @access  Public
exports.getHistory = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 }).limit(10);
        res.json({ success: true, data: queries });
    } catch (error) {
        res.status(500).json({ success: false, error: 'DB error' });
    }
};
