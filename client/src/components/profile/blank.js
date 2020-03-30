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