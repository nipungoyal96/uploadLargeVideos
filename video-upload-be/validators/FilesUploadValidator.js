const UploadCompConfig = require("../Constants/UploadCompConfig").UploadCompConfig;
const path = require("path");

class FilesUploadValidator
{
    filesName = [];
    filesSize = [];
    
    constructor(filesName, filesSize) {
        this.filesName = filesName;
        this.filesSize = filesSize;
    }

    validateFilesSize() {
        const fileValidation = {
            isValid: false,
            message: ''
        };

        for(let i = 0; i < this.filesSize.length; i++) {
            if(this.filesSize[i] > UploadCompConfig.maxFileSize) {
                fileValidation.message = `File size cannot be greater than ${UploadCompConfig.maxFileSize/ (1024 * 1024)} Mb`;
                return fileValidation;
            } else if(this.filesSize[i] < UploadCompConfig.minFileSize) {
                fileValidation.message = `File size cannot be less than ${UploadCompConfig.minFileSize/ (1024 * 1024)} Mb`;
                return fileValidation;
            } 
        }

        fileValidation.isValid = true;
        return fileValidation;
    }

    validateFileTypes() {
        for(let i = 0; i < this.filesName.length; i++) {
            const extension = path.extname(this.filesName[i]);
            if(!UploadCompConfig.supportedFormats.includes(extension)) 
            return {
                isValid: false,
                message: 'invalid file types'
            };
        }

        return {isValid: true};
    }

    checkNoOfFiles() {
        const filesValidation = {
            isValid: false,
            message: ''
        };

        if(this.filesName.length < UploadCompConfig.minNoOfFiles) {
            filesValidation.message = `No of files cannot be less than ${UploadCompConfig.minNoOfFiles}`;
            return filesValidation;
        }

        if(this.filesName.length > UploadCompConfig.maxNoOfFiles) {
            filesValidation.message = `No of files cannot be grater than ${UploadCompConfig.maxNoOfFiles}`;
            return filesValidation;
        }

        filesValidation.isValid = true;
        return filesValidation;
    }

}

exports.FilesUploadValidator = FilesUploadValidator;