const { FilesValidatorService } = require("../services/filesValidatorService");
const Videos = require('../models/videos');
const { default: FileUploadService } = require("../services/fileUploadService");
const fileSessionService = require("../services/fileSessionService").default;

const genrateVideosUploadSession = async (req, res, next) => {
    let {
        filesName,
        filesSize
    } = req.body

    filesName = JSON.parse(filesName);
    filesSize = JSON.parse(filesSize);

    const areFilesValidRes = FilesValidatorService.areFilesValid(filesName, filesSize);
    if(!areFilesValidRes.isValid) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request'
        })
    }

    const fileService = new fileSessionService();

    const videosData = fileService.createUploadData(filesName, filesSize)
    const videos = Videos(videosData);

    try {
        await videos.save(); //await createdLogin.save();
      } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong Please Try again'
        })
      }

    res.status(200).json({
        success: true,
        id: videos._id,
        uniqueFilesName: videosData.uniqueFilesName
    });
  };
  
  const uploadFile = async (request, response, next) => {
     try {
        const file = request.file
            let {
                sessionId,
                fileName,
                isLastBlock
            } = request.body

            isLastBlock = parseInt(isLastBlock)

            const fileUploadService = new FileUploadService({
                file,
                fileName,
                fileSessionId: sessionId,
                isLastBlock
            })

            if(!fileUploadService.validateUniqueFileName) {
                return response.json({
                    success: false,
                    message: 'Invalid file'
                })
            }

            const fileResponse = await fileUploadService.writeFileData()

            if (fileResponse.success === false) {
                return response.status(500).json({
                    success: false,
                    message: 'Error uploading file'
                })
            }

            response.status(201).json({
                success: true,
                fileId: fileResponse.fileId
            })

     } catch(err) {

     }
  }
  exports.genrateVideosUploadSession = genrateVideosUploadSession;
  exports.uploadFile = uploadFile;