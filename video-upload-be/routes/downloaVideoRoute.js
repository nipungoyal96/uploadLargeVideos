const express = require('express');

const router = express.Router();
const downloadVideoController = require('../controllers/downloadVideoController.js');

router.get('/downloadVideo', downloadVideoController.downloadVideo);

module.exports = router;