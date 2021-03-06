import React from 'react';
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers';
import './reset.css';

import Main from "./pages/Main";
import Login from './pages/Login';
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import VideoUpload from "./pages/CreateVideo"

function App() {
    return (
        <Router history={history}>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/player' component={VideoPlayer}/>
                <Route path='/create/video' component={VideoUpload}/>
                <Route path='/create/playlist' component={VideoUpload}/>
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default App;
