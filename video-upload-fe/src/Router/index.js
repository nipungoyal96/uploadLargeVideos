import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllVideos from '../Components/AllVideos';
import UploadProgress from '../Components/UploadProgress';
import UploadVideoForm from '../Components/UploadVideoForm';

const Routes = () => 
    <Router>
    <Switch>
        <Route exact path="/" component={UploadVideoForm}/>
        <Route exact path="/progress" component={UploadProgress}/>
        <Route exact path="/videos" component={AllVideos}/>
    </Switch>
    </Router>

export default Routes;