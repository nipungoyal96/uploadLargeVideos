
const UploadFile = ({isMultiple, setFormField}) => {
    return <input type="file" onChange={(e) => setFormField(Object.values(e.target.files), 'files')} multiple = {isMultiple} />
}

export default UploadFile;