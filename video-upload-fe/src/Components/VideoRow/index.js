import React from 'react';
import styles from './index.module.css';

const VideoRow = ({date, loginId, isHeading, toggleModal, index}) => {
    return(
        <div className={styles.container}>
            <label className={styles.docName}> {date}</label>
            <label style={{marginLeft: isHeading? "13px": "0px"}} className={styles.docName}> {loginId}</label>
            <label style={{color: "blue"}} onClick = {() => toggleModal(index, true)} className={styles.docName}> {!isHeading ? "View": ""} </label>
        </div>
    )
}

export default React.memo(VideoRow);