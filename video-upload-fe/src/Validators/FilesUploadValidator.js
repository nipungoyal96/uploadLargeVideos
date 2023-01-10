import { UploadCompConfig } from "../Constants/UploadCompConfig";
import Util from "../helpers/Util";

class FilesUploadValidator
{
    files = [];

    constructor(files) {
        this.files = files;
    }

    validateFilesSize() {
        const fileValidation = {
            isValid: false,
            message: ''
        };

        for(let i = 0; i < this.files.length; i++) {
            if(this.files[i].size > UploadCompConfig.maxFileSize) {
                fileValidation.message = `File size cannot be greater than ${UploadCompConfig.maxFileSize/ 1048576} Mb`;
                return fileValidation;
            } else if(this.files[i].size < UploadCompConfig.minFileSize) {
                fileValidation.message = `File size cannot be less than ${UploadCompConfig.minFileSize/ 1048576} Mb`;
                return fileValidation;
            } 
        }

        fileValidation.isValid = true;
        return fileValidation;
    }

    validateFileTypes() {
        for(let i = 0; i < this.files.length; i++) {
            const extension = Util.getFileExtension(this.files[i].name);
            if(!UploadCompConfig.supportedFormats.includes(extension)) 
            return {
                isValid: false,
                message: 'Invalid file types'
            };
        }

        return {isValid: true};
    }

    checkNoOfFiles() {
        const filesValidation = {
            isValid: false,
            message: ''
        };

        if(this.files.length < UploadCompConfig.minNoOfFiles) {
            filesValidation.message = `No of files cannot be less than ${UploadCompConfig.minNoOfFiles} Mb`;
            return filesValidation;
        }

        if(this.files.length > UploadCompConfig.maxNoOfFiles) {
            filesValidation.message = `No of files cannot be grater than ${UploadCompConfig.maxNoOfFiles} Mb`;
            return filesValidation;
        }

        filesValidation.isValid = true;
        return filesValidation;
    }

}

export default FilesUploadValidator;