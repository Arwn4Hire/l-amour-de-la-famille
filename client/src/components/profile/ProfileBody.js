import React, { Component } from 'react'
import {isAuthenticated} from '../../auth'
import { Redirect, Link } from "react-router-dom";
import {listByUser} from '../../apis/apiPost'
import { read } from '../../apis/apiUser'
import ProfileTabs from './ProfileTabs'
//import FollowProfileButton from "./FollowProfileButton";
import defaultProfile from '../../assets/images/useravatar.png'
import loadingSkeleton from '../../assets/images/skeleton-loading.gif'
import cog from '../../assets/images/cog-solid.svg'
import './profile.css'
import UserPostImgs from './UserPostImgs';


class ProfileBody extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignIn: false,
      following: false,
      error: "",
      posts: [],
      loading: false
    };
  }

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userId => {
    this.setState({loading: true})
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignIn: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following, loading: false });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data)
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;    
    this.init(userId);
  }

  UNSAFE_componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignIn, user, posts, loading} = this.state;
    if (redirectToSignIn) return <Redirect to="/sign-in" />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : defaultProfile;
    return (
      <div className='container'>
      {loading ? (
        <img className='img-fluid' width='auto'  src={loadingSkeleton} alt='loading'/>
    ) : (
      <>
      <header>

      <div className="container">
    
        <div className="profile">
    
          <div className="profile-image">
    
            <img src={photoUrl}
            onError={i => (i.target.src = `${defaultProfile}`)}
            alt={user.name}
            height="150"
            width="150"
            className='img-fluid'
            style={{ borderRadius: "50%" }}/>
    
          </div>
          {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
          <div className="profile-user-settings">
    
            <h1 className="profile-user-name">{user.name}</h1>
            
            <Link className='link-pf' to={`/user/edit/${user._id}`}><button className="profile-edit-btn btn-info">Edit Profile</button></Link>
    
            <button className="btn profile-settings-btn" aria-label="profile settings"><img  src={cog} alt='setting'/></button>
            
          </div>
          ) : (
            <p>kl</p>
            // <FollowProfileButton
            //   following={this.state.following}
            //   onButtonClick={this.clickFollowButton}
            ///>
          )}{" "}
    
          <ProfileTabs
          followers={user.followers}
          following={user.following}
          posts={posts}
        />
    
          <div className="profile-bio">
    
            <p className="profile-real-name">{`Joined ${new Date(user.created).toDateString()}`} <br/>{user.about}</p>
    
          </div>

        </div>
        
    
      </div>
      
   
    
    </header>
    
   <UserPostImgs 
   posts={posts}/>
    </>
      )}
    </div>
    
    
    );
  }
}

export default ProfileBody;
