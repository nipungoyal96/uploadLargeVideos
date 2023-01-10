import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import videoUploadReducer from './uplodVIdeo.reducer';

const rootReducer = combineReducers({
    video: videoUploadReducer,
    toastr: toastrReducer
})

export default rootReducer;