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
import EditPost from "./post/EditPost";
import Followers from './components/profile/Followers'
import Following from './components/profile/Following'
import PrivateRoute from "./auth/PrivateRoute";
import FindUsers from "./user/FindUsers";
import Location from "./views/Location"
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'

const MainRouter = () => (
    <div>
    <Menu/>
    <Switch>
    <Route exact path = '/' component={Landing}/>
    <Route exact path='/sign-up' component={SignUp}/>
    <Route exact path='/sign-in' component={SignIn}/>
    <Route exact path = '/home' component={Home}/>
    <Route exact path='/find-users' component={FindUsers}/>
    <Route exact path='/hash-tags' component={HashTag}/>
    <PrivateRoute exact path='/post-location/:postId' component={Location}/>
    <Route exact path='/forgot-password' component={ForgotPassword}/>
    <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
    <PrivateRoute exact path='/user/:userId' component={Profile}/>
    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
    <PrivateRoute exact path='/followers' component={Followers}/>
    <PrivateRoute exact path='/following' component={Following}/>
    <PrivateRoute exact path='/create-feed' component={New}/>
    <Route exact path="/post/:postId" component={SinglePost} />
    <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
    </Switch>
    </div>
)

export default MainRouter;