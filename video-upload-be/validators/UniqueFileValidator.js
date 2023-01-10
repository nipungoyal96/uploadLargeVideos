const { validate, version } = require('uuid');

class uniqueFileNameValidator {
    fileName;

    constructor(fileName) {
        this.fileName = fileName
    }

    validate() {
        const fileName = this.fileName.split('_')[0]
        return validate(fileName) && version(fileName) === 4
    }

    getErrorMessage() {
        return 'Invalid unique file name'
    }
}

exports.default = uniqueFileNameValidator