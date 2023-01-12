import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './index.module.css';

const VideoStatus = ({percentage, name}) => {
    return(
        <div className={styles.container}>
            <label className={styles.docName}> {name}</label>
            <div style={{ width: "30px", height: "30px", minWidth: "30px" }} className="algin-self-center">
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
        </div>
    )
}

export default React.memo(VideoStatus);