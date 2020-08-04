import React from 'react';

import {BrowserRouter, Switch, Route, } from 'react-router-dom';
import LandingPage from '../pages/Home';
import SignUpPage from '../pages/SignUpPage';
import TimeLinePostPage from '../pages/TimeLinePostPage';
import PostDetailsPage from '../pages/PostDetailsPage';


export default props =>{

    return <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/SignUp">
                    <SignUpPage />
                </Route>
                <Route exact path="/TimeLine">
                    <TimeLinePostPage />
                </Route>
                <Route exact path="/PostDetails/:postId">
                    <PostDetailsPage />
                </Route>  
                <Route path="/">
                    <p>Deu ruim</p>
                </Route>
            </Switch>
    </BrowserRouter>
}