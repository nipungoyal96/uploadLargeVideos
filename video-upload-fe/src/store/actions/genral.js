import * as Actions from './actionTypes';

export const setIsLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: Actions.SET_IS_LOADING,
            isLoading
        })
    }
}