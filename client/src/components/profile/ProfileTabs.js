import React, { Component } from "react";
import { Link } from "react-router-dom";
//mport defaultProfile from "../images/useravatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
   // console.log(posts)
    return (
      <div className="profile-stats">
      <ul>
        <li>
          <div className="profile-stat-count">
            <span className="profile-stat-count">{followers.length} followers</span>
          </div>
          </li>

          <li>
          <div className="profile-stat-count">
            <span className="profile-stat-count">{following.length} following</span>
          </div>
          </li>

          <li>
          <div className="profile-stat-count">
            <span className="profile-stat-count">{posts.length} Post</span>
          </div>
          </li>
          </ul>
        
      </div>

      
    );
  }
}

export default ProfileTabs;
