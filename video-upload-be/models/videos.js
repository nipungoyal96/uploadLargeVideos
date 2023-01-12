const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videosSchema = new Schema({
    originalFilesName: { type: Array, required: true },
    uniqueFilesName: { type: Array, required: true },
    filesSize: { type: Array, required: true },
    filesExtension: { type: Array, required: true },
    loginId: {type: Number, require: true},
    email: {type: String, require: true},
    mobileNo: {type: String, require: true},
    isSuccess: {type: Boolean, require: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Videos', videosSchema);