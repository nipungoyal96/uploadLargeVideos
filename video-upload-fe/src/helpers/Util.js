
class Util {
    static getFileExtension(fileName)  {
        const fileNames = fileName.split('.')
        if (fileNames.length === 0) {
            return ''
        }

        return fileNames[fileNames.length - 1]
    }
}

export default Util;