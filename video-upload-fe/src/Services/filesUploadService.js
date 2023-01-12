import apiService from './ApiService';

class FilesService {
    files = [];
    sessionId = '';
    fileNames = [];
    phoneNo = '';
    email = ''; 
    loginId = '';
    constructor(files, phoneNo, email, loginId) {
        this.files = files;
        this.phoneNo = phoneNo;
        this.email = email;
        this.loginId = loginId;
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
        formData.append('phoneNo', this.phoneNo);
        formData.append('email', this.email);
        formData.append('loginId', this.loginId)
        return formData
    }
}

export default FilesService;