const { v4 : uuidv4 } = require('uuid');
const path = require('path')

class FileSessionService {
    

    createUploadData(filesName, filesSize,mobileNo, email, loginId) {
        const filesExtension = [];
        const uniqueFilesName = filesName.map(fileName => {
            const fileExtension = this.getFileExtension(fileName)
            filesExtension.push(fileExtension)
            return this.createUniqueFileName(fileExtension)
        })
        
        return {
            originalFilesName: filesName,
            uniqueFilesName,
            filesSize,
            filesExtension,
            mobileNo, email, loginId
        }
    }

    getFileExtension(fileName) {
        return path.extname(fileName)
    }

    createUniqueFileName(fileExtension) {
        const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, "")
        return `${uuidv4()}_${timeStamp}${fileExtension}`
    }
}

exports.default = FileSessionService;