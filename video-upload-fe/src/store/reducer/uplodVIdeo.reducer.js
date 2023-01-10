import * as Actions from '../actions/actionTypes';

const initialState = {
    files: [],
    sessionId: '',
    uniqueFilesName: []
}

const videoUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_SESSION_DETAILS :
            return {
                ...state,
                sessionId: action.payload.sessionId,
                uniqueFilesName: action.payload.uniqueFilesName
            }
        default:
            return state
    }

}

export default videoUploadReducer;