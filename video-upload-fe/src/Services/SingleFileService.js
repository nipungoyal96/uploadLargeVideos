import { UploadCompConfig } from "../Constants/UploadCompConfig";
import apiService from './ApiService';

class SingleFileService {
    file
    fileSessionId
    fileBlockCount = 0
    totalFileBlocks = 0

    startBlock = 0
    endBlock = 0

    constructor(file, fileName, fileSessionId) {
        this.file = file
        this.fileName = fileName
        this.fileSessionId = fileSessionId
        this.setTotalFileBlocks()
    }

    setTotalFileBlocks() {
        this.totalFileBlocks = Math.ceil((this.file.size / UploadCompConfig.chunkSize));
    }

    async uploadFile(){
        return await apiService.uploadVideo(this.getFileData()).then(async res => {
            const responseJson = res.data;
            if (responseJson.success === false) {
                return {
                    success: false,
                    message: responseJson.message,
                    progress: 0,
                    uploadNextBlock: false
                }
            }
    
            const uploadFileResponse = {
                success: true,
                message: '',
                progress: this.calculateUploadProgress(),
                uploadNextBlock: !this.isLastBlock()
            }
    
            uploadFileResponse.message = 'Uploaded Successfully'
            
            return uploadFileResponse
        })
       
    }

    getFileData() {
        const formData = new FormData()

        formData.append('file', this.getFileBlock())
        formData.append('fileSessionId', this.fileSessionId.toString())
        formData.append('fileName', this.fileName)
        formData.append('isLastBlock', this.isLastBlock() ? '1' : '0')

        return formData
    }

    getFileBlock() {
        this.startBlock = this.endBlock
        this.endBlock = this.endBlock + this.maxFileBlockSize

        const blob = this.file.slice(this.startBlock, this.endBlock)

        this.fileBlockCount += 1

        return blob
    }

    calculateUploadProgress() {
        if (this.totalFileBlocks === 1) {
            return 100
        }

        return Math.round((this.fileBlockCount / this.totalFileBlocks) * 100)
    }

    isLastBlock() {
        return this.fileBlockCount === this.totalFileBlocks
    }
}

export default SingleFileService;