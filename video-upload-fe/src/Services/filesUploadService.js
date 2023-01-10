import apiService from './ApiService';

class FilesService {
    files = [];
    sessionId = '';
    fileNames = [];

    constructor(files) {
        this.files = files;
    }

    async createFilesUploadSession() {
        return new Promise(async (resolve, reject) => { 
            await apiService.genrateUploadSession(this.getFileSessionDetails()).then(response => {
            if(!response.data.success) {
                reject({
                    success: false,
                    message: response.data.message 
                })
            }

            this.sessionId = response.data.id;
            
            resolve({
                success: true,
                sessionId: response.data.id,
                uniqueFilesName: response.data.uniqueFilesName
            })
        }).catch(err => {
            console.log(err)
            reject({
                success: false,
                message: "Something Went Wrong" 
            })
        })
    })
    }

    getFileSessionDetails() {
        const formData = new FormData()
        const fileNames = this.files.map((file) => file.name)
        const fileSizes = this.files.map((file) => file.size)

        formData.append('filesName', JSON.stringify(fileNames))
        formData.append('filesSize', JSON.stringify(fileSizes))
       
        return formData
    }
}

export default FilesService;