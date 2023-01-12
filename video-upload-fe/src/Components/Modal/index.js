import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadVideo } from '../../store/actions/downloadVideo';
import styles from './index.module.css';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ModalRow = ({index, fileName, onDownloadClick, isDownloadComplete, selectedIndex, percent }) => <div className='d-flex space-btw'>
    <label className='algin-self-center'>{fileName}</label>
    {selectedIndex === index && !isDownloadComplete ? <div style={{ width: "30px", height: "30px", minWidth: "30px" }} className="algin-self-center">
                <CircularProgressbar value={percent} text={`${percent}%`} />
            </div> :
    <img alt="download-icon" style={{opacity: !isDownloadComplete ? '0.5': '1', height: '25px'}} 
    onClick={() => onDownloadClick(index, fileName)} className='algin-self-center'  
    src='./images/downloadIcon.png' />}
</div>

const Modal = ({data, toggleModal}) => {
    const dispatch = useDispatch();
    const isDownloadComplete = useSelector((state) => state.download?.isCompleted);
    const percent = useSelector((state) => state.download?.downloadPercent);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if(!data) return <></>
    
    const {loginId, email, mobileNo} = data;


    const onDownloadClick = (index, originalName) => {
        if(!isDownloadComplete) return;
        setSelectedIndex(index);
        dispatch(downloadVideo({
            fileType: data.filesExtension[index],
            originalName,
            fileName: data.uniqueFilesName[index],
            
        }))
    }

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <span onClick={() => toggleModal(0, false)} className={styles.close}>&times;</span>
                    <div className='d-flex justify-center w-100'>
                        <label className='text-blue'>Login id :&nbsp;</label>
                        <label>{loginId}</label>
                    </div>
                    <div className='d-flex justify-center w-100'>
                        <label className='text-blue'>Email id :&nbsp; </label>
                        <label>{email}</label>
                    </div>
                    <div className='d-flex justify-center w-100'>
                        <label className='text-blue'>Phone No :&nbsp; </label>
                        <label>{mobileNo}</label>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        {data?.originalFilesName?.map((loginId, i) => <ModalRow 
                        index = {i}
                        onDownloadClick = {onDownloadClick} 
                        key = {i} 
                        fileName={loginId}
                        isDownloadComplete={isDownloadComplete}
                        percent = {percent}
                        selectedIndex = {selectedIndex}
                        />
                        
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;