import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../images/useravatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
   // console.log(posts)
    return (
      <div className="profile-stats">
        <li>
          <div className="profile-stat-count">
            <h5 className="text-white">{followers.length} followers</h5>
            <hr />
            {followers.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      style={{ borderRadius: "50%", border: "1px solid black" }}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}
                      onError={i => (i.target.src = `${defaultProfile}`)}
                    />
                    <div>
                      <small className="text-center font-italic text-white">
                        {person.name}
                      </small>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h5 className="text-white">{following.length} following</h5>
            <hr />
            {following.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      style={{ borderRadius: "50%", border: "1px solid black" }}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}
                      onError={i => (i.target.src = `${DefaultProfile}`)}
                    />
                    <div>
                      <small className="text-center font-italic text-white">
                        {person.name}
                      </small>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h5 className="text-white">{posts.length} Post</h5>
            <hr />
            {posts.map((post, i) => (
              <div key={i}>
                <div>
                  <Link to={`/post/${post._id}`}>
                    <div>
                      <p className="lead">{post.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </li>

        <div className="profile-stats">
    
      <ul>
        <li><span className="profile-stat-count">{posts.length}</span> posts</li>
        <li><span className="profile-stat-count">188</span> followers</li>
        <li><span className="profile-stat-count">206</span> following</li>
      </ul>

    </div>
      </div>

      
    );
  }
}

export default ProfileTabs;




import React, { Component } from 'react'
import appPostDefaultImg from '../../assets/images/wormhole.jpg'

 class UserPostImgs extends Component {
    render()
     {const {posts} = this.props

        return (
            <div>
            <main>
    {posts.map((postImg, i) => (

    
      <div className="container">
    
        <div className="gallery">
    
          <div className="gallery-item" >
    
          <img src={`${process.env.REACT_APP_API_URL}/post/photo/${postImg._id}`} alt={postImg.title} onError={i => i.target.src=`${appPostDefaultImg}`} className='img-fluid gallery-image' height='200px' width='100%' style={{borderRadius: '12%'}}/>
    
            <div className="gallery-item-info">
    
              <ul>
                <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
                <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
              </ul>
    
            </div>
    
          </div>
    
         
    
          
    
        </div>

    
        <div className="loader"></div>
    
      </div>
      
      ))}
    </main>
                
            </div>
        )
    }
}
export default UserPostImgs



import React, { Component } from 'react';
import { read } from '../../apis/apiUser'
import LoadingSkeleton from '../../assets/images/skeleton-loading.gif'
import { isAuthenticated } from "../../auth";
import {Link} from 'react-router-dom'
import DefaultProfile from '../../assets/images/useravatar.png'

class Followers extends Component {
  constructor() {
    super()
    this.state = {
      user: { following: [], followers: [] },
      loading: false
    }
  }

  init = userId => {
    this.setState({loading: true})
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignIn: true });
      } else {
        console.log(data)
        this.setState({ user: data, loading: false });
        
      }
    });
  };

  componentDidMount() {
    const userId = isAuthenticated().user._id;    
    this.init(userId);
  }

  UNSAFE_componentWillReceiveProps() {
    const userId = isAuthenticated().user._id;
    this.init(userId);
  }

  render() {
    const user = isAuthenticated().user
    const followers = user.followers
    console.log(user)
    return (
      <div className="container">
      <div className="row">
      <div className="col md 4">
      <h2>Followers</h2>
      {followers.map((person, i) => (
        <div key={i}>
          <div>
            <Link to={`/user/${person._id}`}>
              <img
                className="float-left mr-2"
                height="30px"
                width="30px"
                style={{ borderRadius: "50%", border: "1px solid black" }}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                alt={person.name}
                onError={i => (i.target.src = `${DefaultProfile}`)}
              />
              <div>
                <small className="text-center font-italic text-white">
                  {person.name}
                </small>
              </div>
            </Link>
          </div>
        </div>
      ))}
      </div>
      </div>
      </div>
    );
  }
}

export default Followers

<div className="form-group">
        <img src={locationImg} alt="geo-loc" />
        <label className=" bold">Location</label>
        <input
          className="form-control text-dark bold"
          type="text"
          name="place"
          placeholder="Post's place"
          onChange={this.handleChange("place")}
          value={place}
          style={{ fontSize: "1.0em" }}
          hidden
        />
      </div>



      <div className="gallery-item">
      <img className="gallery-image" src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=500&h=500&fit=crop" alt="sunset behind San Francisco city skyline"/>
  </div>

  <div className="gallery-item">
      <img className="gallery-image" src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=500&h=500&fit=crop" alt="people holding umbrellas on a busy street at night lit by street lights and illuminated signs in Tokyo, Japan"/>
  </div>

  <div className="gallery-item">
      <img className="gallery-image" src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=500&h=500&fit=crop" alt="car interior from central back seat position showing driver and blurred view through windscreen of a busy road at night"/>
  </div>

  <div className="gallery-item">
      <img className="gallery-image" src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=500&h=500&fit=crop" alt="back view of woman wearing a backpack and beanie waiting to cross the road on a busy street at night in New York City, USA"/>
  </div>

  <div className="gallery-item">
      <img className="gallery-image" src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=500&h=500&fit=crop" alt="man wearing a black jacket, white shirt, blue jeans, and brown boots, playing a white electric guitar while sitting on an amp"/>
  </div>

   // <Link to="/hash-tags" style={isActive(history, "/search-hashtags")}>
        //   {" "}
        //   <img src={search} alt="hash-tags" />
        // </Link>