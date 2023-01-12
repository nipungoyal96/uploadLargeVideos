import * as Actions from '../actions/actionTypes';

const initialState = {
    files: [],
    sessionId: '',
    uniqueFilesName: [],
    uploadProgress: []
}

const videoUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_SESSION_DETAILS :
            return {
                ...state,
                sessionId: action.payload.sessionId,
                uniqueFilesName: action.payload.uniqueFilesName
            }
        
        case Actions.SET_SINGLE_FILE_PROGRESS : 
            const newProgess = [...state.uploadProgress];
            newProgess[action.payload.index] = action.payload;
            return {
                ...state,
                uploadProgress: newProgess
            }
        case Actions.SET_FILES_PROGRESS: 
            return {
                ...state,
                uploadProgress: action.payload
            }
        default:
            return state
    }

}

export default videoUploadReducer;