import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from './core/Langing'
import Home from './core/Home'
import Menu from './core/Menu'
import Profile from "./components/profile/ProfileBody";
import EditProfile from './components/profile/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import HashTag from './components/feed/HashTag'
import New from "./post/New";
import SinglePost from './post/SinglePost'

import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => (
    <div>
    <Menu/>
    <Switch>
    <Route exact path = '/' component={Landing}/>
    <Route exact path='/sign-up' component={SignUp}/>
    <Route exact path='/sign-in' component={SignIn}/>
    <Route exact path = '/home' component={Home}/>
    <Route exact path='/hash-tags' component={HashTag}/>
    <PrivateRoute exact path='/user/:userId' component={Profile}/>
    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
    <PrivateRoute exact path='/create-feed' component={New}/>
    <Route exact path="/post/:postId" component={SinglePost} />
    </Switch>
    </div>
)

export default MainRouter;