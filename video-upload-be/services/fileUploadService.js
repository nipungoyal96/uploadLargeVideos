const fs = require('fs');

class FileUploadService
{
    fileData;
    constructor(fileData) {
        this.fileData = fileData
    }


    async writeFileData() {
        const fileStreamResponse = await this.writeToFileStream()

        if (fileStreamResponse === false) {
            return {
                success: false
            }
        }

        //let fileId = 0

        if (this.fileData.isLastBlock) {
            //fileId = await this.createFileRecord()
        }

        return {
            success: true
        }
    }

    async writeToFileStream(){
        return await new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(
                `${__dirname}/../videos/${this.fileData.fileName}`,
                {
                    flags: 'a'
                } 
            )
                
            fileStream.write(this.fileData.file.buffer, 'base64')
    
            fileStream.on('error', (err) => {
                console.log('error occurred while writing to stream')
                reject(false)
            })

            fileStream.on('finish', () => resolve(true))
            
            fileStream.end()
        })
    }

    async validateUniqueFileName() {
        const fileNameValidator = (await import('../validators/UniqueFileValidator')).default
    
        const validator = new fileNameValidator(this.fileData.fileName)
        const isValid = validator.validate()
    
        return {
            isValid,
            errorMessage: isValid ? '' : validator.getErrorMessage()
        }
    }
}

exports.default = FileUploadService;