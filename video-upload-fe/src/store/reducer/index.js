import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import videoUploadReducer from './uplodVIdeo.reducer';
import formReducer from './form.reducer';
import genralReducer from './genral.reducer';
import downloadReducer from './download.reducer';

const rootReducer = combineReducers({
    video: videoUploadReducer,
    toastr: toastrReducer,
    form: formReducer,
    genral: genralReducer,
    download: downloadReducer
})

export default rootReducer;