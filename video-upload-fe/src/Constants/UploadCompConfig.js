
export const UploadCompConfig = {
    supportedFormats: ['mp4', 'mpeg', 'avi', 'mkv'],
    maxFileSize: 4* 1024 * 1048576, // 4 gb,
    maxNoOfFiles: 8,
    minNoOfFiles: 1,
    minFileSize: 5 * 1048576 , // 50mb
    chunkSize: 50 * 1048576, // 50 mb
}