const { v4 : uuidv4 } = require('uuid');
const path = require('path')
//import fileSessionRepo from '../repository/FileSessionRepo'

let instance = null;

class FileSessionService {
    

    // async findFileSessionDetails(fileSessionId, fileName){
    //     const fileDetails = await fileSessionRepo.findFileSession(fileSessionId, fileName)

    //     if (Array.isArray(fileDetails)) {
    //         return fileDetails[0]
    //     }

    //     return false
    // }

    createUploadData(filesName, filesSize) {
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
            filesExtension
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