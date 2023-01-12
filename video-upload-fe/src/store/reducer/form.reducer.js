import * as Actions from '../actions/actionTypes';

const initialState = {
    loginId: '',
    phoneNo: '',
    email: '',
    files: [],
    allVideos: []
}

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_FORM_VALUES :
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ALL_VIDEOS:
            return {
                ...state,
                allVideos: action.payload
            }
        default:
            return state
        }
    
    }
    
    export default formReducer;