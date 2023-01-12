
class Util {
    static getFileExtension(fileName)  {
        const fileNames = fileName.split('.')
        if (fileNames.length === 0) {
            return ''
        }

        return fileNames[fileNames.length - 1]
    }

    static getDateTime(timestamp) {
        const dateFormat= new Date(timestamp);
        return dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds();
    }
}

export default Util;