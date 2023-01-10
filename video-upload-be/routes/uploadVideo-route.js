const express = require('express');

const multer = require( 'multer');
const upload = multer()
const router = express.Router();
const uploadVideoController = require('../controllers/uploadVideoController');

router.post('/uploadVideo', upload.single('file'), uploadVideoController.uploadFile)
router.post('/genrateVideosUploadSession', upload.none(), uploadVideoController.genrateVideosUploadSession )

module.exports = router;