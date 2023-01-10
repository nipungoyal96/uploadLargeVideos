const FilesUploadValidator = require("../validators/FilesUploadValidator").FilesUploadValidator;

class FilesValidatorService {

    static areFilesValid(fileNames, filesSize) {
        const filesValidator = new FilesUploadValidator(fileNames, filesSize);

        const checkNoOfFilesRes = filesValidator.checkNoOfFiles();
        if(!checkNoOfFilesRes.isValid) {
            return checkNoOfFilesRes
        }

        const checkFilesSizeRes = filesValidator.validateFilesSize();
        if(!checkFilesSizeRes.isValid) {
            return checkFilesSizeRes
        }

        const checkFileTypesRes = filesValidator.validateFileTypes();
        if(!checkFileTypesRes.isValid) {
            return checkFileTypesRes;
        }

        return {
            isValid: true
        }
    }
}

exports.FilesValidatorService = FilesValidatorService;