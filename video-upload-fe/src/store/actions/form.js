import * as Actions from './actionTypes';
import apiService from '../../Services/ApiService';
import { toastr } from 'react-redux-toastr';
import { setIsLoading } from './genral';

export const setFormValuesAction = (payload) => {
    return (dispatch) => {
        dispatch({
            type: Actions.SET_FORM_VALUES,
            payload: payload
        })
    }
} 

export const setAllVideos = (payload) => {
    return (dispatch) => {
        dispatch({
            type: Actions.SET_ALL_VIDEOS,
            payload: payload
        })
    }
}

export const getAllVideos = () => {
    return (dispatch) => {
        dispatch(setIsLoading(true))
        apiService.getAllVideos().then(videosRes => {
            dispatch(setIsLoading(false))
            dispatch(setAllVideos(videosRes.data));
        }).catch(err => {
            toastr.error("Something went wrong in fetching videos", "Please try again")
        })
    }
}