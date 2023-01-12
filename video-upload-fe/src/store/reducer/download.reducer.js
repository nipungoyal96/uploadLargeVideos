import * as Actions from '../actions/actionTypes';

const initialState = {
    downloadPercent: 0,
    isCompleted: true
}

const downloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_DOWNLOAD_PROGRESS :
            return {
                ...state,
                downloadPercent: action.percent
            }
        case Actions.SET_IS_DOWNLOAD_COMPLETE: 
            return {
            ...state,
            isCompleted: action.isComplete

        }
        default:
            return state;
    }
}

export default downloadReducer;