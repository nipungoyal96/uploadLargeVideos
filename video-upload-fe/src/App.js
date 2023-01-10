import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';

import UploadFile from "./Components/UploadFIle";
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <UploadFile isMultiple />
      <ReduxToastr
            timeOut={3000}
            newestOnTop={true}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            removeOnHover={false}
            closeOnToastrClick
        />
    </Provider>

  );
}

export default App;
