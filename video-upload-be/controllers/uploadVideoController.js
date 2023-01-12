const { FilesValidatorService } = require("../services/filesValidatorService");
const Videos = require('../models/videos');
const { default: FileUploadService } = require("../services/fileUploadService");
const fileSessionService = require("../services/fileSessionService").default;

const genrateVideosUploadSession = async (req, res, next) => {
    let {
        filesName,
        filesSize,
        phoneNo,
        email,
        loginId
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

    const videosData = fileService.createUploadData(filesName, filesSize, phoneNo, email, loginId)
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
  
  const setUploadComplete = async (request, response, next) => {
    try{
        let { sessionId } = request.body
        Videos.findByIdAndUpdate(sessionId, {isSuccess: true}).then(data => {
            if (!data) {
                response.status(404).send({
                message: "Error in updating status"
              });
            } else response.send({ message: "Update Sucessfully" });
          })
          .catch(err => {
            response.status(500).send({
              message: "Error in updating status"
            });
          });

    } catch(err) {
        console.log(err);
        res.status(500).send({
            message: "Error in updating status"
          });
    }
  }

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

  const getAllVideos = async (request, response, next) => {
        try {
            Videos.find({ isSuccess: true })
    .then(data => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send({
        message:
          "Some error occurred while retrieving videos."
      });
    });
        } catch(err) {
            response.status(500).send({
                message:
                   "Some error occurred while retrieving videos."
              });
        }
    }

  exports.genrateVideosUploadSession = genrateVideosUploadSession;
  exports.uploadFile = uploadFile;
  exports.setUploadComplete = setUploadComplete;
  exports.getAllVideos = getAllVideos;