import axios from 'axios';
import { ApiConfig } from '../Constants/ApiConfig';

class apiService {

    genrateUploadSession = (formData) => {
        return new Promise((resolve, reject) => {
            axios.post(ApiConfig.routes.genrateSession , formData, {
                headers: { 'Content-Type': 'multipart/form-data' },}
              ).then(response => resolve(response))
              .catch(err => reject(err))
        })
    }

    uploadVideo = (formData) => {
        return new Promise((resolve, reject) => {
            axios.post(ApiConfig.routes.uploadSingleFile , formData, {
                headers: { 'Content-Type': 'multipart/form-data' },}
              ).then(response => resolve(response))
              .catch(err => reject(err))
        })
    }

    setSuccess = (sessionId) => {
        return new Promise((resolve, reject) => {
            axios.post(ApiConfig.routes.setSuccess , {sessionId}
              ).then(response => resolve(response))
              .catch(err => reject(err))
        })
    }

    getAllVideos = () => {
        return new Promise((resolve, reject) => {
            axios.get(ApiConfig.routes.getAllVideos).then(response => resolve(response))
            .catch(err => reject(err))
      })
    }

    downloadVideo = (fileName, callback) => {
        let config = {
            method: 'get',
            url: `http://localhost:5000/downloadVideos/downloadVideo`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: { fileName} ,
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
                callback(percentCompleted)
                console.log(percentCompleted)
            }
        };

        return new Promise((resolve, reject) => axios(config).then(response => resolve(response))
        .catch(err => reject(err)))
    }

}

const instance = new apiService();

export default instance;
