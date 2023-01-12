import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import Form from "../Form"
import VideoStatus from "../VideoStatus";

const UploadProgress = () => {
    const documents = useSelector(state => state.video.uploadProgress);
    const history = useHistory();
    return <Form title = "Upload Video Progress">
        {documents.map((document, i ) => <VideoStatus key = {i} name = {document.fileName} percentage = {document.progress}/>)}
        <div className="d-flex justify-center">
            <label className="text-blue" onClick={() => history.push("/")} >Back</label>
        </div>
    </Form>
}

export default UploadProgress