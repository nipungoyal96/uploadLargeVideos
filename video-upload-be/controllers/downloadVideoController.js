var libpath = require('path');
var fs = require('fs');

const downloadVideo = async (request, response, next) => {
  const uniqueName = request.query.fileName;
  if (!uniqueName) {
    response.status(404).send({
      message: "File Not found"
    });
  }
  const filename = `${__dirname}/../videos/${uniqueName}`;

  fs.stat(filename, function (error, stat) {
    if (error) {
      response.status(404).send({
        message: "File Not found"
      });
      return;
    } else {
      const stream = fs.createReadStream(filename, { bufferSize: 64 * 1024 });
      response._contentLength = stat.size;
      stream.pipe(response);
    }
  });
};

exports.downloadVideo = downloadVideo;