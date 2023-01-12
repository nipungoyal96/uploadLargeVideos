import * as Actions from '../actions/actionTypes';

const initialState = {
    isLoading: false
}

const genralReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_IS_LOADING: 
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}

export default genralReducer;