import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Util from "../../helpers/Util";
import { getAllVideos } from "../../store/actions/form";
import Form from "../Form";
import Modal from "../Modal";
import VideoRow from "../VideoRow";


const AllVideos = () => {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.form?.allVideos);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const toggleModal = (index, isOpen) => {
        setSelectedIndex(index);
        setIsModalOpen(isOpen);
    }
    
    useEffect(() => {
        dispatch(getAllVideos())
    }, [dispatch])
    return <Form title="All Videos">
        {videos.length ? <VideoRow date="Created At" loginId = "Login Id" isHeading/>: <></>}
        {videos.length ? videos.map((video, i ) => <VideoRow  index = {i} toggleModal= {toggleModal} key={video.createdAt} date={Util.getDateTime(video.createdAt)} loginId = {video.loginId} />)
        : <label className="d-flex justify-center text-blue w-100">No records found</label>}
        {isModalOpen && <Modal  toggleModal = {toggleModal} data = {videos[selectedIndex]} />}
    </Form>
}

export default AllVideos