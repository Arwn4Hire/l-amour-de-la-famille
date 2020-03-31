import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../assets/images/logo.svg";
import camera from "../assets/images/camera.svg";
import search from '../assets/images/search-plus-solid.svg'
import users from '../assets/images/user-plus-solid.svg'
import signup from '../assets/images/id-card-regular.svg'
import signin from '../assets/images/sign-in-alt-solid.svg'
import signoutImg from '../assets/images/sign-out-alt-solid.svg'
import defaultProfile from '../assets/images/useravatar.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#000000" };
  else return { color: "#000000" };
};

const Menu = ({ history }) => {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/home" style={isActive(history, "/home")}>
          <img src={logo} alt="logo" />l'amour de la famille
        </Link>

        {!isAuthenticated() && (
          <>
          <Link to="/hash-tags" style={isActive(history, "/search-hashtags")}>
          {" "}
          <img src={search} alt="hash-tags" />
        </Link>
        <Link to="/sign-up" style={isActive(history, "/sign-up")}>
          {" "}
          <img src={signup} alt="signup" />
        </Link>

        <Link to="/sign-in" style={isActive(history, "/sign-in")}>
        {" "}
        <img src={signin} alt="signin" />
      </Link>

      </>
        )}

        {isAuthenticated() && (
          <>

      <Link to="/find-users" style={isActive(history, "/find-users")}>
      {" "}
      <img src={users} alt="users-add" />
    </Link>
        
      <Link to="/create-feed" style={isActive(history, "/create-feed")}>
          {" "}
          <img src={camera} alt="publish" />
        </Link>

        <Link to="/hash-tags" style={isActive(history, "/search-hashtags")}>
          {" "}
          <img src={search} alt="hash-tags" />
        </Link>

        <Link to={`/user/${isAuthenticated().user._id}`} style={
          (isActive(history, `/user/${isAuthenticated().user._id}`))
        }>
          
          <img src={isAuthenticated().user._id
            ? `${process.env.REACT_APP_API_URL}/user/photo/${
              isAuthenticated().user._id
              }?${new Date().getTime()}`
            : defaultProfile} alt={isAuthenticated().user.name}
            onError={i => (i.target.src = `${defaultProfile}`)}
            width="23px" height="23px" style={{ borderRadius: "50%", border: "1px solid black" }}/>
        </Link>
     
        <span style={isActive(history, "#")}
        onClick={() => signout(() => history.push("/home"))}>
          {" "}
          <img src={signoutImg} alt="sign out" />
        </span>
        </>
      )}
        
      </div>
      
    </header>
  );
}

export default withRouter(Menu);