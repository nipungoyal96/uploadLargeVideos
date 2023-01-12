import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';

import store from './store';
import Loader from './Components/Loader';
import Router  from './Router'

import './App.css'
function App() {

  return (
    <Provider store={store}>
      <Loader />
      <Router />
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
