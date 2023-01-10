import FilesUploadValidator from "../Validators/FilesUploadValidator";

class FilesValidatorService {

    static areFilesValid(files) {
        const filesValidator = new FilesUploadValidator(files);

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

export default FilesValidatorService;