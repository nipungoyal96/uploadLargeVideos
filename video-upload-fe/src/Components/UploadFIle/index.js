import { useDispatch } from 'react-redux';
import { createSession } from '../../store/actions/uploadFIles';

const UploadFile = ({isMultiple}) => {
    const dispatch = useDispatch();
    const uploadFiles = (e) => {
        dispatch(createSession(Object.values(e.target.files)))
    }

    return <input type="file" onChange = {uploadFiles} multiple = {isMultiple} />
}

export default UploadFile;