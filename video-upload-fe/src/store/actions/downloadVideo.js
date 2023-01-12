import * as Actions from './actionTypes';

import { toastr } from "react-redux-toastr"
import FilesDownloadService from "../../Services/fileDownloadService"

export const downloadVideo = (payload) => {
    return async(dispatch) => {
       const downloadFileService = new FilesDownloadService(payload.fileName,
            payload.fileType,
            payload.originalName
        )
        const setDownloadPercent = (percent) => {
            dispatch(setProgress(percent))
        }
        dispatch(setProgress(0));
        dispatch(setIsDownloadComplete(false));
        const isDownlaoded = await downloadFileService.downloadVideo(setDownloadPercent)
        dispatch(setIsDownloadComplete(true));
        if(!isDownlaoded) {
            toastr.error("Error in downloading")
        }
    }
}

export const setIsDownloadComplete = (isComplete) => {
    return (dispatch) => {
        dispatch({
            type: Actions.SET_IS_DOWNLOAD_COMPLETE,
            isComplete
        })
    }
}

export const setProgress = (percent) => {
    return (dispatch) => {
    dispatch({
        type: Actions.SET_DOWNLOAD_PROGRESS,
        percent})
    }
}