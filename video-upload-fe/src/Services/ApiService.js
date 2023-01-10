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


}

const instance = new apiService();

export default instance;
