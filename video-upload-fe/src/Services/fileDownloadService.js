import apiService from './ApiService';

class FilesDownloadService {
    originalName;
    fileName;
    fileType;

    constructor(fileName, fileType,originalName){
        this.fileName = fileName;
        this.fileType = fileType;
        this.originalName = originalName;
    }

    async downloadVideo (setProgressCallback) {
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

      const isDownlaoded =  await apiService.downloadVideo(this.fileName, setProgressCallback).then((response) => {
            const blobFile = new Blob([response?.data], { type: 'video/' + this.fileType });
            const url = window.URL.createObjectURL(blobFile);
            a.href = url;
            a.download = this.originalName; 
            a.click();
            window.URL.revokeObjectURL(url);
            return true
        }).catch(err => {
            console.log(err);
            return false;
        })

        return isDownlaoded;
    }

}

export default FilesDownloadService;