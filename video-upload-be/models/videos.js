const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videosSchema = new Schema({
    originalFilesName: { type: Array, required: true },
    uniqFilesName: { type: Array, required: true },
    filesSize: { type: Array, required: true },
    filesExtension: { type: Array, required: true },
})

module.exports = mongoose.model('Videos', videosSchema);