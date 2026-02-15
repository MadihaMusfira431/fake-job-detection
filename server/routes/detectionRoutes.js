const express = require('express');
const router = express.Router();
const { detectJob, getHistory } = require('../controllers/detectionController');

router.post('/detect', detectJob);
router.get('/history', getHistory);

module.exports = router;
