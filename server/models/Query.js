const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    inputText: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    probability: {
        type: Number,
        required: true
    },
    reason: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Query', QuerySchema);
