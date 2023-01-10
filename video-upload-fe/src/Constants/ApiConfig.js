let BASE_BE_URL = "http://localhost:5000";

export const ApiConfig = {
    routes: {
        genrateSession: BASE_BE_URL + "/uploadVideos/genrateVideosUploadSession",
        uploadSingleFile: BASE_BE_URL + "/uploadVideos/uploadVideo"
    }
}