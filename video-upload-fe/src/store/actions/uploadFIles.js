import * as Actions from './actionTypes';
import FilesService from "../../Services/filesUploadService";
import { toastr } from 'react-redux-toastr';
import FilesValidatorService from '../../Services/filesValidatorService';
import SingleFileService from '../../Services/SingleFileService';
import { setIsLoading } from './genral';
import apiService from '../../Services/ApiService';

let forceStop = false;
let uploadCount = 0;
let totalCount = 0;

export const createSession = (redirectCallback) => {
  return (dispatch, getState) => {
    let state = getState().form;
    let {files, phoneNo, email, loginId} = state;
    const validator =  FilesValidatorService.areFilesValid(files);
    if(!validator.isValid) {
        toastr.error(validator.message);
        return;
    }
    const filesService = new FilesService(files, phoneNo, email, loginId);
    dispatch(setIsLoading(true));
    filesService.createFilesUploadSession()
    .then(sessionData => {
        if(sessionData.success){
            delete sessionData.success;
            dispatch(setSession(sessionData)) 

            const filesProgress = files.map((file, i)  => {
                return {
                    index: i,
                    progress: 0,
                    fileName: file.name,
                    isCompleted: false,
                    isError: false
                }
            });

            dispatch(setFilesProgress(filesProgress));
            //start uploading files
            
            forceStop = false;
            uploadCount = 0;
            totalCount = files.length;
            for(let i = 0; i < files.length; i++)
            dispatch(uploadSingleFile(files[i], sessionData.uniqueFilesName[i], sessionData.sessionId,files[i].name,  i));
            
            redirectCallback();
        } else {
            toastr.error(sessionData.message);
        }
        dispatch(setIsLoading(false));   
    }).catch(() => {
        dispatch(setIsLoading(false)); 
        toastr.error(
            'Something went wrong',
            'Please Try again'
        );
    })
  };
};
 

export const setSession = (payload) => {
    return (dispatch) => {
        dispatch({
            type: Actions.SET_SESSION_DETAILS,
            payload: payload
        })
    }
}

export const setSingleFileProgress = (payload) => {
    return async(dispatch) => {
        dispatch({
            type: Actions.SET_SINGLE_FILE_PROGRESS,
            payload: payload
        })
    }
}

export const setFilesProgress = (payload) => {
    return async(dispatch) => {
        dispatch({
            type: Actions.SET_FILES_PROGRESS,
            payload: payload
        })
    }
}

export const uploadSingleFile = (file, fileName, sessionId, originalName, i) => {
    return async(dispatch) => {
       const fileService = new SingleFileService(file, fileName, sessionId);
       let isUploadFile = true;
       let retryCount = 0;
       while(isUploadFile) {
            const uploadRes = await fileService.uploadFile();
            if(uploadRes.success && !forceStop) {
                retryCount = 0;

                dispatch(setSingleFileProgress({
                    index: i,
                    progress: uploadRes.progress,
                    isCompleted: !uploadRes.uploadNextBlock,
                    isError: false,
                    fileName: originalName
                }))
                if(!uploadRes.uploadNextBlock) {
                    isUploadFile = false;
                    uploadCount++;
                    if(uploadCount === totalCount) {
                        // set success
                        apiService.setSuccess(sessionId).then(() => {
                            toastr.success("Videos Uploaded Successfully")
                        }).catch(err => {
                            toastr.error("Something went wrong Please try again")
                        } )
                    }
                }
            } else {
                retryCount++;
                if(retryCount === 2) {
                    isUploadFile = false;
                    forceStop = true;
                    dispatch(setSingleFileProgress({
                        index: i,
                        progress: 0,
                        isCompleted: false,
                        isError: true,
                        fileName: originalName
                    }))
                    toastr.error(
                        'Something went wrong',
                        'Please Try again'
                    );
                }
            }

       }
    }
}