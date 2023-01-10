import * as Actions from './actionTypes';
import FilesService from "../../Services/filesUploadService";
import { toastr } from 'react-redux-toastr';
import FilesValidatorService from '../../Services/filesValidatorService';
import SingleFileService from '../../Services/SingleFileService';

export const createSession = (files) => {
  return (dispatch) => {
    const validator =  FilesValidatorService.areFilesValid(files);
    if(!validator.isValid) {
        toastr.error(validator.message);
        return;
    }
    const filesService = new FilesService(files);
    filesService.createFilesUploadSession()
    .then(sessionData => {
        if(sessionData.success){
            delete sessionData.success;
            dispatch(setSession(sessionData)) 
            for(let i = 0; i < files.length; i++)
            dispatch(uploadSingleFile(files[i], sessionData.uniqueFilesName[i], sessionData.sessionId));
        } else {
            toastr.error(sessionData.message);
        }   
    }).catch(() => {
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

export const uploadSingleFile = (file, fileName, sessionId) => {
    return async(dispatch) => {
       const fileService = new SingleFileService(file, fileName, sessionId);
       let isUploadFile = true;
       let retryCount = 0;
       while(isUploadFile) {
            const uploadRes = await fileService.uploadFile();
            if(uploadRes.success ) {
                retryCount = 0;
                if(!uploadRes.uploadNextBlock)
                isUploadFile = false;
            } else {
                retryCount++;
                if(retryCount === 2) {
                    isUploadFile = false;
                    toastr.error(
                        'Something went wrong',
                        'Please Try again'
                    );
                }
            }

       }
    }
}